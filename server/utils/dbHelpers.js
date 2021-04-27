const { User } = require('../database/models/user');
const { Article } = require('../database/models/article');
const bcrypt = require("bcryptjs");

/// USERS ///

const saveUser = async (userInput) => {
    try {
        const { userName, passWord } = userInput;
        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(passWord, salt);
        const [user, created] = await User.findOrCreate({
            where: { userName },
            defaults: {
                userName,
                passWord
                // passWord: hash
            }
        });
        return { 'userInfo': user.dataValues, 'created': created };
    } catch(error) {  
        console.error(error);
    }
}

const getUser = async (userInput) => {
    try {
        const { userName, passWord } = userInput;
        const user = await User.findAll({
        where: {
            userName,
            passWord
        }});
        return user;
    } catch(error) {
        console.error(error);
    }
}

const deleteUser = async (userId) => {
    try {
        const deletedUser = await User.destroy({
        where: {
            id: userId
        }});
        return deletedUser;
    } catch(error) {
        console.error(error);
    }
}



/// ARTICLES ///

const saveArticle = async (articleInfo) => {
    try {
        const newArticle = new Article(articleInfo);
        await newArticle.save();
        const allArticles = await getArticles(articleInfo.userId);
        return allArticles;
    } catch(error) {  
        console.error(error)
    }
}

const deleteArticle = async ({ id, userId }) => {
    try {
        await Article.destroy({
        where: {
            id
        }});
        const remainingArticles = await getArticles(userId);
        return remainingArticles;
    } catch(error) {
        console.error(error);
    }
}

const getArticles = async (userId) => {
    try {
        const articles = await Article.findAll({
        where: {
            userId
        }});
        return articles;
    } catch(error) {
        console.error(error);
    }
}


module.exports.saveUser = saveUser;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
module.exports.saveArticle = saveArticle;
module.exports.deleteArticle = deleteArticle;
module.exports.getArticles = getArticles;