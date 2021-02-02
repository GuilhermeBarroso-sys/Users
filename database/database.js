const Sequelize = require("sequelize");

const conn = new Sequelize('vendas', 'root', '050113', {
    host:'localhost',
    dialect:'mysql',
    timezone:"-03:00"
});

module.exports = conn;