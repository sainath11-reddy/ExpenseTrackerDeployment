const express = require('express');
const router = express.Router();
const expenseControllers = require('../controllers/expenses')
router.post('/add-expense',expenseControllers.postExpense)
router.get('/get-expenses',expenseControllers.getExpenses);
module.exports = router;