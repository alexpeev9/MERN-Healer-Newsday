const articleService = require('../services/articleService');
const jwt = require("jsonwebtoken")

exports.isAuthor  = async (req, res, next) => {
    try{
        let article = await articleService.getOne(req.params.articleId); 
        let sender = req.body.requestSender;
        if( article.creator == sender._id || sender.isAdmin == true)
        {
            req.body.article = article;
            return next();
        }
        else{
            return res.status(401).json({ ok: false, message: "Unauthorized!" });
        }
    }catch(e) {
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