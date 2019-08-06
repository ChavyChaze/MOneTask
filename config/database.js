const Sequeliza = require('sequelize');

module.exports = new Sequeliza('magnetic', 'postgres', '123456', {
    dialect: 'postgres',
    host: 'localhost',
    port: 3306,
  
    // pool: {
    //     max: 5,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    // }
  });