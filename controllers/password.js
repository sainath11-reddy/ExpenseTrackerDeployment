const users = require('../models/users');
let sgMail = require('@sendgrid/mail');
const { use } = require('../routes/users');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async(msg)=>{
    try{
        await sgMail.send(msg);
        console.log("Message sent successfully");
    }
    catch(err){
        console.log(err);
        if(err.response){
            console.log(err.response.body);
        }
    }
}


exports.sendMail = async(req, res, next)=>{
    let email = req.body.email;

    users.findAll({where:{email:email}}).then(result =>{
        if(result){
            sendMail({
                to:email,
                from:"sainath11reddy@gmail.com",
                subject:"NodeJS say hello",
                text:"It is really this easy"
            });
        }
        else{
            res.status(401).json({msg:"no user Id"});
        }
    }).catch(err => console.log(err))
}