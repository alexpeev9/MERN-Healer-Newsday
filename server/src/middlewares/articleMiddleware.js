const articleService = require('../services/articleService');
const jwt = require("jsonwebtoken")

exports.isAuthor = async (req, res, next) => {
    try {
        let article = await articleService.getOne(req.params.articleId);
        let sender = req.body.requestSender;
        if (article.creator._id == sender._id || sender.isAdmin == true) {
            req.body.article = article;
            return next();
        }
        else {
            return res.status(401).json({ ok: false, message: "Unauthorized!" });
        }
    } catch (e) {
        return res.status(401).json({ ok: false, message: "This article doesn't exist" });
    }
}

exports.isNotVoted = async (req, res, next) => {
    try {
        let article = await articleService.getOne(req.params.articleId);
        let articleCreatorId = article.creator._id.toString();
        let senderId = req.body.requestSender._id;

        if (articleCreatorId != senderId) {
            for (let voters of article.votes) {
                if (voters._id.toString() == senderId) {
                    return res.status(401).json({ ok: false, message: "You have already voted for this post" });
                }
            }
            return next();
        }
        else {
            return res.status(401).json({ ok: false, message: "Authors cannot vote for their post!" });
        }
    } catch (e) {
        return res.status(401).json({ ok: false, message: "This article doesn't exist" });
    }
}

exports.assignCreator = (req, res, next) => {
    const cookieName = "token";
    const token = req.cookies[cookieName];

    if (token) {
        try {
            req.body.creator = jwt.verify(token, process.env.JWT_SECRET)
            return next();
        } catch (e) {
            res.clearCookie(cookieName)
            return res.status(401).json({ ok: false, message: "Unauthorized!" });
        }
    }
    return res.status(401).json({ ok: false, message: "You must be logged!" });
}