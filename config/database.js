const Sequeliza = require('sequelize');

module.exports = new Sequeliza('magnetic', 'postgres', '123456', {
    dialect: 'postgres',
    host: 'localhost',
    port: 3306,
    
    // const db = new Sequeliza('sql7301009', 'sql7301009', '7C2jVnKNtY', {
    //     dialect: 'postgres',
    //     host: 'sql7.freemysqlhosting.net',
    //     port: 3306,
  
    // pool: {
    //     max: 5,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    // }
  });