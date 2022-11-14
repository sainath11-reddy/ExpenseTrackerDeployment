const Sequelize = require('../util/database');
const sequelize = require('sequelize');

const expenses = Sequelize.define("expenses", {
    id:{
        type:sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    expenseAmt:{
        type:sequelize.STRING,
        allowNull:false,
    },
    desc:{
        type:sequelize.STRING,
        allowNull:false
    },
    category:{
        type:sequelize.STRING,
        allowNull:false
    }
})

module.exports = expenses;