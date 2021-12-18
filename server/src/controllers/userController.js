const router = require('express').Router();
const userService = require('../services/userService');
const { isAuthorized } = require('../middlewares/authMiddleware');

const register = async (req, res) => {
    let { username, firstName, lastName, password } = req.body;

    try {
        await userService.register({ username, firstName, lastName, password });
        let token = await userService.login({ username, password });
        
        res.cookie("token", token, {
            secure: true,
            httpOnly: true
        })
        
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
    try {
        let token = await userService.login({ username, password });

        res.cookie("token", token, {
            secure: true,
            httpOnly: true
        })

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

const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ok: true, status:200});
} 

const list = async (req, res) => {
    try {
        let users = await userService.getAll();

        res.cookie("token", token, {
            secure: true,
            httpOnly: true
        })

        res.json({
            ok: true,
            status: 200,
            statusCode: "OK",
            users
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
// middlewares: authMiddleware, adminMiddleware
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/list', isAuthorized, list);

module.exports = router;