const express = require('express');
const path = require('path');

const userController = require('./controllers/userController');
const articleController = require('./controllers/articleController');

const router = express.Router();

router.use('/api/user', userController);
router.use('/api/article', articleController);

router.use('*', (req, res) => {
    if(process.env.NODE_ENV == "production")
    {
        res.sendFile(path.join(__dirname,'../../','/client/build/index.html'));
    }
    else{
        res.status(404).json("Not Found");
    }
});

module.exports = router;