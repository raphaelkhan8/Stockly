require('dotenv').config({path:__dirname+'/./../../.env'});
const Sequelize = require('sequelize');

const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

sequelize.authenticate().then(() => {
    console.log('Connected to the database.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


module.exports.sequelize = sequelize;