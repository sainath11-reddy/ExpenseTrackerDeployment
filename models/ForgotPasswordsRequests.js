const Sequelize = require('../util/database');
const sequelize = require('sequelize');

const ForgotPasswordRequests = Sequelize.define("ForgotPasswordRequests", {
    id:{
        type:sequelize.STRING,
        unique:true,
        allowNull:false,
        primaryKey:true
    },
    isactive:{
        type:sequelize.BOOLEAN,
        allowNull:false
    }
});
module.exports = ForgotPasswordRequests;