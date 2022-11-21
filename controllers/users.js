const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.postSignupDetails = (req,res,next)=>{
    console.log(req.body);
    bcrypt.hash(req.body.password,10, (err, hash)=>{
        if(!err){
            User.create({
                name:req.body.name,
                email:req.body.email,
                password:hash,
                premiumUser:false
            }).then(resolve=>{
                console.log('Signup details added');
                res.send("Success");
            }).catch(err =>{
                res.sendStatus(403);
                console.log(err);
            })
        }
        else{
            res.status(500).json(err);
        }
        

    })
    
    
}
function generateAccessToken(user){
    return jwt.sign({userId:user.id, name:user.name}, "secretKey");
}

exports.postLoginDetails =async (req,res,next)=>{
    const email=req.body.email;
    const password = req.body.password;
    const user = await User.findOne({where:{email:email}});
    if(user){
        bcrypt.compare(password, user.password, (err, result)=>{
            if(err){
                res.status(500).json({message:err, success:false})
            }
            if(result == true){
                res.status(200).json({success:true, message:"User logged in Successfully", token:generateAccessToken(user)});
            }
            else{
                res.status(401).json({success:false, message:"Password is incorrect"});
            }
        })
        
    }
    else{
        res.status(404).json({success:false, meassage:"User not found"});
    }
}