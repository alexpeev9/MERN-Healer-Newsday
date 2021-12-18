const Article = require('../models/Article');
const User = require('../models/User');

exports.getlist = () => Article.find().lean();
exports.getOne = (id) => Article.findById(id).populate('votes').lean();

exports.create = async (articleData) => {
    let article = await Article.create(articleData);
    return User.updateMany({ "_id": article.creator }, { $push: { myArticles: article._id } })
};

exports.destroy = async (id) => {
    const article = await Article.findOne({ _id: id });
    await User.findOneAndUpdate({ "_id": article.creator }, { $pull: { myArticles: article._id } });
    return article.remove();
}

// exports.edit = (id, articleData) => {
//     return Article.updateOne({ _id: id }, { $set: articleData }, { runValidators: true })
// }

// exports.deleteArticle = async (id) => {
//     const article = await Article.findOne({ _id: id });
//     await User.findOneAndUpdate({ "_id": article.author }, { $pull: { myArticles: article._id } });
//     return article.remove();
// }

// exports.addUpVoteOnArticle = async (user, article) => {
//     return Article.findOneAndUpdate({ "_id": article._id }, { $push: { votes: user._id }, $inc: { rating: +1 } });
// }
// exports.addDownVoteOnArticle = async (user, article) => {
//     return Article.findOneAndUpdate({ "_id": article._id }, { $push: { votes: user._id }, $inc: { rating: -1 } });
// }

// exports.isOwn = async (article, userId) => {
//     if (article.author._id == userId) {
//         return true;
//     }
//     else {
//         return false;
//     }
// }

// exports.isVoted = async (article, userId) => {
//     if (article.author._id == userId) {
//         return true;
//     }
//     for (let currUser of article.votes) {
//         if (currUser._id == userId) {
//             return true;
//         }
//     }
//     return false;
// }