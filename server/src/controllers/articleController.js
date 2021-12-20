const router = require('express').Router();
const articleService = require('../services/articleService');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { assignCreator, isAuthor, isNotVoted } = require('../middlewares/articleMiddleware');

const articleCreate = async (req, res) => {
    let { title, imageUrl, description, creator } = req.body;
    try {
        await articleService.create({ title, imageUrl, description, creator });

        res.json({
            ok: true,
            status: 200,
            statusCode: "OK",
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            status: "Server Error",
            statusCode: 500,
            message: err.message
        });
    }
}

const articleGetList = async (req, res) => {
    try {
        let articles = await articleService.getlist();

        res.json({
            ok: true,
            status: 200,
            statusCode: "OK",
            articles
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            status: "Cannot Get Articles",
            statusCode: 500,
            message: err.message
        });
    }
};

const articleGetOne = async (req, res) => {
    try {
        let articleId = req.params.articleId;
        let article = await articleService.getOne(articleId);

        res.json({
            ok: true,
            status: 200,
            statusCode: "OK",
            article
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            status: "Cannot Get Article",
            statusCode: 500,
            message: "Cannot Get Article"
        });
    }
};

const articleUpdate = async (req, res) => {
    try {
        let articleId = req.params.articleId;
        let article = await articleService.edit(articleId, req.body);

        res.json({
            ok: true,
            status: 200,
            statusCode: "OK",
            article
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            status: "Cannot Update Article",
            statusCode: 500,
            message: "Cannot Update Article"
        });
    }
};

const articleDelete = async (req, res) => {
    try {
        let articleId = req.params.articleId;
        await articleService.destroy(articleId);

        res.json({
            ok: true,
            status: 200,
            statusCode: "OK",
        });
    } catch (err) {
        res.status(401).json({
            ok: false,
            status: "Unauthorized!",
            statusCode: 401,
            message: err.message
        });
    }
};

const articleUpVote = async (req, res) => {
    try {
        let articleId = req.params.articleId;
        let requestSender = req.body.requestSender;
        await articleService.upVote(articleId, requestSender);

        res.json({
            ok: true,
            status: 200,
            statusCode: "OK",
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            status: "Cannot Upvote",
            statusCode: 500,
            message: err.message
        });
    }
};

const articleDownVote = async (req, res) => {
    try {
        let articleId = req.params.articleId;
        let requestSender = req.body.requestSender;
        await articleService.downVote(articleId, requestSender);

        res.json({
            ok: true,
            status: 200,
            statusCode: "OK",
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            status: "Cannot Upvote",
            statusCode: 500,
            message: err.message
        });
    }
};

router.post('/create', assignCreator, articleCreate);
router.get('/list', articleGetList);
router.delete('/delete/:articleId', isAuthenticated, isAuthor, articleDelete);
router.put('/edit/:articleId', isAuthenticated, isAuthor, articleUpdate);
router.get('/upvote/:articleId', isAuthenticated, isNotVoted, articleUpVote);
router.get('/downvote/:articleId', isAuthenticated, isNotVoted, articleDownVote);
router.get('/:articleId', articleGetOne);
module.exports = router;