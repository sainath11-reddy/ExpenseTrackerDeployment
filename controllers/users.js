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