const Sequeliza = require('sequelize');

const db = new Sequeliza('magnetic', 'postgres', '123456', {
    dialect: 'postgres',
    host: 'localhost',
    port: 3306,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


db.authenticate()
    .then(() => console.log('MySQL connection established!'))
    .catch(err => console.log('MySQL connection error. Please make sure MySQL is running.\n' + err))