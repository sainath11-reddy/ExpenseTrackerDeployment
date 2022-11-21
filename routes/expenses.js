const express = require('express');
const router = express.Router();
const expenseControllers = require('../controllers/expenses')
const userAuthentication = require('../middleware/auth');
// router.use(middleware);
router.post('/add-expense',userAuthentication.authenticate,expenseControllers.postExpense)
router.get('/get-expenses',userAuthentication.authenticate,expenseControllers.getExpenses);
router.post('/delete-expense', expenseControllers.postDeleteExpense);
router.get('/download', userAuthentication.authenticate, expenseControllers.getDownloads);
module.exports = router;