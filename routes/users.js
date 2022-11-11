const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users')
router.post('/signup',usersController.postSignupDetails);
router.post('/login', usersController.postLoginDetails)
module.exports = router;