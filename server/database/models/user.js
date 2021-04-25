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
    },
    article: {
        type: Sequelize.INTEGER,
        references: 'articles',
        referencesKey: 'id'
    }
    }, {
    freezeTableName: true,
    timeStamps: true,
});

User.hasMany(Article);

module.exports.User = User;