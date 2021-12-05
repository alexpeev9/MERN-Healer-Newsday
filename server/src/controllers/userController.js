const router = require('express').Router();
const userService = require('../services/userService');

const register = async (req, res) => {
    let { username, firstName, lastName, password } = req.body;

    try {
        await userService.register({ username, firstName, lastName, password });
        let token = await userService.login({ username, password });
        
        res.json({
            ok: true, 
            status: 200, 
            statusCode: "OK",
            token
        });
    } catch (err) {
        res.status(401).json({
            ok: false,
            status: "Unauthorized",
            statusCode: 401,
            message: err.message
        });
    }
};

const login = async (req, res) => {
    let { username, password } = req.body;
    try{
        let token = await userService.login({ username, password });

        res.json({
            ok: true, 
            status: 200, 
            statusCode: "OK",
            token
        });
    }catch(err){
        res.status(401).json({
            ok: false,
            status: "Unauthorized",
            statusCode: 401,
            message: err.message
        });
    }
};

const list = async (req, res) => {
    try{
        let users = await userService.getAll();

        res.json({
            ok: true, 
            status: 200, 
            statusCode: "OK",
            users
        });
    }catch(err){
        res.status(401).json({
            ok: false,
            status: "Unauthorized",
            statusCode: 401,
            message: err.message
        });
    }
};

router.post('/login', login);
router.post('/register', register)
router.get('/list', list);

module.exports = router;