const express = require('express');
const paymentsController = require('../controllers/payment');
const userAuthentication = require('../middleware/auth');
const router = express.Router();


router.post('/order',userAuthentication.authenticate,paymentsController.createOrder);

router.post("/verify",userAuthentication.authenticate, paymentsController.verifyOrder);

module.exports=router;