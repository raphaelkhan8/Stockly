const Sequelize = require('sequelize');
const { sequelize } = require('../connection');
const { Article } = require('./article');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    passWord: {
        type: Sequelize.STRING,
        allowNull: false
    }
    }, {
    freezeTableName: true,
    timeStamps: true,
});

User.hasMany(Article);
User.sync();

module.exports.User = User;