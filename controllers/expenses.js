const expenses = require('../models/expenses');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const fileURls = require('../models/fileURls');
// const { captureRejectionSymbol } = require('mysql2/typings/mysql/lib/Connection');
let ITEMS_PER_PAGE = 5;


exports.postExpense = (req, res, next)=>{
    expenses.create({
        expenseAmt:req.body.expenseAmt,
        desc:req.body.desc,
        category:req.body.category,
        userId:req.user.id
    }).then(result =>{
        res.json(result);
    }).catch(err => console.log(err));
}

exports.getExpenses = async (req, res, next)=>{
    let pageNumber = parseInt(req.query.page);
    ITEMS_PER_PAGE = parseInt(req.header('RowsPerPage')) || 5;
    console.log(pageNumber)
    let total_items = await expenses.count({where:{userId:req.user.id}});
    console.log(total_items);
    expenses.findAll({offset:(pageNumber-1)*ITEMS_PER_PAGE, limit:ITEMS_PER_PAGE,where:{userId:req.user.id} }).then(expenses =>{
        res.json({expenses,premiumUser:req.user.premiumUser, success:true, nextPage:total_items>(ITEMS_PER_PAGE*pageNumber), previousPage:pageNumber>1, page:pageNumber})
    }).catch(err => console.log(err))
}

exports.postDeleteExpense = (req,res,next)=>{
    expenses.findByPk(req.body.id).then(expense =>{
        return expense.destroy()
    }).then(result =>{
        // console.log(result);
        res.sendStatus(200);
    }).catch(err => console.log(err));
}

function uploadToS3(data, fileName){
    const BUCKET_NAME= process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
    
    let s3bucket = new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
        Bucket:BUCKET_NAME
    });

    var params = {
        Bucket : BUCKET_NAME,
        Key:fileName,
        Body:data,
        ACL:'public-read'
    };
    return new Promise((resolve, reject)=>{
        s3bucket.upload(params, (err, s3response)=>{
            if(err){
                console.log(err);
            }
            else{
                // console.log('Success',s3response);
                resolve(s3response.Location);
            }
        })
    })
    
}
exports.getDownloads = async (req, res, next)=>{
    if(!req.user.premiumUser){
        return res.status(401).json({ success: false, message: 'User is not a premium User'})
    }
    const expenses = await req.user.getExpenses();
    const expenseData = JSON.stringify(expenses);
    const fileName = `Expense${req.user.id}/${new Date()}`;
    const fileURl = await uploadToS3(expenseData, fileName);
    fileURls.create({
        url:fileURl,
        userId:req.user.id
    });
    res.status(201).json({fileURl:fileURl});
}