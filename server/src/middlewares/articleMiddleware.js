const articleService = require('../services/articleService');
const jwt = require("jsonwebtoken")

exports.isAuthor  = async (req, res, next) => {
    let article = await articleService.getOne(req.params.articleId); 
    if( article.author == req.user._id)
    {
        req.article = article;
        next();
    }
    else{
        return res.redirect('/');
        // return res.render('404', {error: "You are not the author of this article"});
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