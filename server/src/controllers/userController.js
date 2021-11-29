const router = require('express').Router();
const userService = require('../services/userService');

const register = async (req, res) => {
    let { username, firstName, lastName, password } = req.body;

    try {
        await userService.register({ username, firstName, lastName, password });
        let token = await userService.login({ username, password });
        
        res.json({
            token
        });
    } catch (err) {
        res.status(401).send(err.message);
    }
};

const login = async (req, res) => {
    let { username, password } = req.body;
    try{
        let token = await userService.login({ username, password });

        res.json({
            token
        });
    }catch(err){
        res.status(401).send(err.message);
    }
};

router.post('/login', login);
router.post('/register', register)

module.exports = router;