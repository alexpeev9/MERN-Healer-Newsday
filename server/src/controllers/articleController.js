const router = require('express').Router();
const articleService = require('../services/articleService');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { assignCreator } = require('../middlewares/articleMiddleware');

const articleCreate = async (req,res) => {
    let { title, imageUrl, description, creator } = req.body;
    try {
        console.log()
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

router.post('/create', assignCreator, articleCreate);

module.exports = router;