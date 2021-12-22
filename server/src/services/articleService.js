const Article = require('../models/Article');
const User = require('../models/User');

exports.getlist = () => Article.find().lean();
exports.getOne = (id) => Article.findById(id).populate('votes').populate('creator',['_id','firstName','lastName','username']).lean();
exports.create = async (articleData) => {
    let article = await Article.create(articleData);
    return User.updateMany({ "_id": article.creator }, { $push: { myArticles: article._id } })
};

exports.destroy = async (id) => {
    const article = await Article.findOne({ _id: id });
    await User.findOneAndUpdate({ "_id": article.creator }, { $pull: { myArticles: article._id } });
    return article.remove();
}

exports.edit = (id, articleData) => {
    return Article.updateOne({ "_id": id }, { $set: articleData }, { runValidators: true })
}

exports.upVote = async (id, requestSender) => {
    return Article.findOneAndUpdate({ "_id": id }, { $push: { votes: requestSender }, $inc: { rating: +1 } });
}

exports.downVote = async (id, requestSender) => {
    return Article.findOneAndUpdate({ "_id": id }, { $push: { votes: requestSender }, $inc: { rating: -1 } });
}