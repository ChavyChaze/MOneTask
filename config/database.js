const Sequeliza = require('sequelize');

module.exports = new Sequeliza(process.env.MYSQL_DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});