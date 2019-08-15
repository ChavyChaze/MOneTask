const Sequeliza = require('sequelize');

// module.exports = new Sequeliza(process.env.MYSQL_DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
//   dialect: 'mysql',
//   host: process.env.MYSQL_HOST,
//   port: process.env.MYSQL_PORT,

const db = new Sequeliza('sql7301704', 'sql7301704', 'NUVrEyxiQj', {
  dialect: 'mysql',
  host: 'sql7.freemysqlhosting.net',
  port: 3306,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});