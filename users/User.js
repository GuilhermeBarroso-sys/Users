const sequelize = require("sequelize");
const conn = require("../database/database");

const Plan = require("../plan/Plan");
const User = conn.define('User', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    money: {
        type: sequelize.DOUBLE
    }


});
User.belongsTo(Plan)
User.sync({force: true});

module.exports = User;