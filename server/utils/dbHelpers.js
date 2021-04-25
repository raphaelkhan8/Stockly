const { User } = require('../database/models/user');
const { Article } = require('../database/models/article');


/// USERS ///

const saveUser = async (userInfo) => {
    try {
        const newUser = new User(userInfo);
        await newUser.save();
        return newUser;
    } catch(error) {  
        console.error(error);
    }
}

const getUser = async (userId) => {
    try {
        const user = await User.findAll({
        where: {
            id: userId
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
        return newArticle;
    } catch(error) {  
        console.error(error)
    }
}

const deleteArticle = async (articleId) => {
    try {
        const deletedArticle = await Article.destroy({
        where: {
            id: articleId
        }});
        return deletedArticle;
    } catch(error) {
        console.error(error);
    }
}


module.exports.saveUser = saveUser;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
module.exports.saveArticle = saveArticle;
module.exports.deleteArticle = deleteArticle;