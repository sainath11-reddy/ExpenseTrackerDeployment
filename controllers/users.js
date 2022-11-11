const User = require('../models/users');

exports.postSignupDetails = (req,res,next)=>{
    console.log(req.body);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).then(resolve=>{
        console.log('Signup details added');
        res.send("Success");
    }).catch(err =>{
        res.sendStatus(403);
        console.log(err);
    })
    
}

exports.postLoginDetails =async (req,res,next)=>{
    const email=req.body.email;
    const password = req.body.password;
    const user = await User.findOne({where:{email:email}});
    if(user){
        if(user.password == password){
            res.send("Success");
        }
        else{
            res.sendStatus(401);
        }
        
    }
    else{
        res.sendStatus(404);
    }
}