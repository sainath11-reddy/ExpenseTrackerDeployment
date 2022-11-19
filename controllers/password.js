const users = require('../models/users');
const passwordModel=require('../models/ForgotPasswordsRequests');
let sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
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


exports.postMail = async(req, res, next)=>{
    let email = req.body.email;

    users.findOne({where:{email:email}}).then(result =>{
        console.log(result.id)
        if(result){
            let uniqueId=uuidv4();
            console.log(uniqueId)
            passwordModel.create({
                id:uniqueId,
                isactive:true,
                userId:result.id
            }).then(ex =>{
                console.log('Entered the table')
                sendMail({
                    to:email,
                    from:"sainath11reddy@gmail.com",
                    subject:"NodeJS say hello",
                    text:"http://localhost:5000/password/resetpassword/"+uniqueId
                }).then(yes => res.status(200).json({success:true}));
                
            }).catch(err => console.log(err));
            
        }
        else{
            res.status(401).json({msg:"no user Id"});
        }
    }).catch(err => console.log(err))
}

exports.resetPassword = (req,res,next)=>{
    const uuId = req.params.uuId;
    passwordModel.findByPk(uuId).then(result =>{
        if(result){
            if(result.isactive){
                result.update({isactive:false});
                res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${uuId}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                );
                                res.end();
            }
        }
    })
}

exports.UpdatePassword = (req, res, next) =>{
    let newpassword = req.query.newpassword;
    let uuId = req.params.uuId;
    console.log(newpassword);
    passwordModel.findByPk(uuId).then(result =>{
        
        if(result){
            users.findByPk(result.userId).then(user => {
                if(user){
                    bcrypt.hash(newpassword,10, (err, hash)=>{
                        if(!err){
                            user.update({
                                password:hash
                            }).then(resolve=>{
                                console.log('Password Updated Successfully');
                                res.json({yes:"Success"});
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
                
            })
        }
        
    })
}