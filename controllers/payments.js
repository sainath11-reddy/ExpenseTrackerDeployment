const orderId = require('../models/orderId');
let Razorpay = require('razorpay');

const crypto = require("crypto");
let instance = new Razorpay({
   
})
exports.createOrder = (req, res, next)=>{
    instance.orders.create(req.body).then(data =>{

        res.send({"sub":data, "status":"success"});
    }).catch(err =>{
        console.log(err);
        res.send({"sub":err, "status":"failed"});
    })
}

exports.verifyOrder = (req,res,next)=>{
    
    let body = req.body.orderId+"|"+req.body.paymentId;
    var expectedSignature = crypto.createHmac('sha256','Duj55WuvBNGAVDvV2vcoUzE4').update(body.toString()).digest('hex');
    console.log("sig"+expectedSignature);
    console. log("sig"+req.body.orderSig)
    var response = {"status":"failure"};
    if(expectedSignature === req.body.orderSig){
        response = {"status":"success"};
        orderId.create({
            orderId:req.body.orderId,
            userId:req.user.id
        })
    }
    
    res.json(response);


}