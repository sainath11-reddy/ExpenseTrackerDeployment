const express =require("express");
const router = express.Router();
const passwordController = require('../controllers/password');

router.post('/forgotpassword',passwordController.postMail);
router.get('/resetpassword/:uuId',passwordController.resetPassword);
router.get('/updatepassword/:uuId', passwordController.UpdatePassword);
module.exports = router;