const expenses = require('../models/expenses');

exports.postExpense = (req, res, next)=>{
    expenses.create({
        expenseAmt:req.body.expenseAmt,
        desc:req.body.desc,
        category:req.body.category
    }).then(result =>{
        res.sendStatus(200);
    }).catch(err => console.log(err));
}

exports.getExpenses = (req, res, next)=>{
    expenses.findAll().then(expenses =>{
        res.json({expenses, success:true})
    }).catch(err => console.log(err))
}