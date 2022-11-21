const Sequelize = require('../util/database');
const sequelize = require('sequelize');

const fileURls = Sequelize.define("fileURls", {
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    url:{
        type:sequelize.STRING,
        allowNull:false
    }
});
module.exports = fileURls;