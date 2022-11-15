const jwt = require('jsonwebtoken');
const users = require('../models/users');
exports.authenticate = (req,res,next)=>{
    try{
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token, 'secretKey');
        console.log(user);
        users.findByPk(user.userId).then(user =>{
            req.user = user;
            next();
    })
    }
    catch(err){
        console.log(err);
        // next();
        return res.status(401).json({"success":false});
    }
    
}
