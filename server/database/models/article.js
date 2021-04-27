const Sequelize = require('sequelize');
const { sequelize } = require('../connection');

const Article = sequelize.define('article', {
    id: {
        type: Sequelize.INTEGER,
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
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
    }, {
        freezeTableName: true,
        timeStamps: true,
});

Article.sync();

module.exports.Article = Article;