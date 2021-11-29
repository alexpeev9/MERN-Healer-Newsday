const User = require('../models/User');
const jwt = require('../utils/jwt');

exports.login = async ({ username, password }) => {

    let user = await User.findByUsername(username);

    if (!user) {
        throw new Error('Invalid Username or Password!')
    }
    let isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Invalid Username or password');
    }

    let payload = {
        _id: user._id,
        username: user.username,
    };

    let token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7D' });
    
    return token;
}

exports.register = (userData) => User.create(userData);

exports.getAll = () => User.find().lean();
exports.getOne = (id) => User.findById(id).lean();