const sequelize = require('sequelize');
const Sequelize = require('../util/database');

const users = Sequelize.define('users',{
    id:{
        type:sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:sequelize.STRING,
        allowNull:false,
        
    },
    email:{
        type:sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:sequelize.STRING,
        allowNull:false,
    },
    premiumUser:{
        type:sequelize.BOOLEAN,
        allowNull:false,
    }  
})

module.exports = users;