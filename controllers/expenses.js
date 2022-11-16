const expenses = require('../models/expenses');
const jwt = require('jsonwebtoken');
exports.postExpense = (req, res, next)=>{
    expenses.create({
        expenseAmt:req.body.expenseAmt,
        desc:req.body.desc,
        category:req.body.category,
        userId:req.user.id
    }).then(result =>{
        res.json(result);
    }).catch(err => console.log(err));
}

exports.getExpenses = (req, res, next)=>{
    
    expenses.findAll({where:{userId:req.user.id}}).then(expenses =>{
        res.json({expenses, success:true})
    }).catch(err => console.log(err))
}

exports.postDeleteExpense = (req,res,next)=>{
    expenses.findByPk(req.body.id).then(expense =>{
        return expense.destroy()
    }).then(result =>{
        // console.log(result);
        res.sendStatus(200);
    }).catch(err => console.log(err));
}