const Sequelize = require('sequelize');
const { sequelize } = require('../connection');

const Article = sequelize.define('article', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    symbol: {
        type: Sequelize.STRING,
        allowNull: false
    },
    summary: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sentiment: {
        type: Sequelize.STRING,
        allowNull: false
    },
    score: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user: {
        type: Sequelize.INTEGER,
        references: 'users',
        referencesKey: 'id'
    }
    }, {
    freezeTableName: true,
    timeStamps: true,
});


module.exports.Article = Article;