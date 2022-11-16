const Sequelize = require('../util/database');
const sequelize = require('sequelize');

const orderId = Sequelize.define('orderId',{
    orderId:{
        type:sequelize.STRING,
        primaryKey:true
    }
});
module.exports = orderId;