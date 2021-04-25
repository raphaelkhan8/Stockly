require('dotenv').config({path:__dirname+'/./../../.env'});
const Sequelize = require('sequelize');

const { dbName, dbHost, dbPort, dbUser, dbPass } = process.env;

console.log(dbPort);
console.log(typeof dbPort);

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: 'postgres',
    ssl: { 
        rejectUnauthorized: false
    }
});

sequelize.authenticate().then(() => {
    console.log('Connected to the database.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


module.exports.sequelize = sequelize;