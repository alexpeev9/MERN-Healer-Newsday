const User = require('../models/User');
const jwt = require('../utils/jwt');

exports.login = async ({ username, password }) => {

    let user = await User.findByUsername(username);

    if (!user) {
        throw new Error('Invalid Username!')
    }
    let isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Invalid Password!');
    }

    let payload = {
        _id: user._id,
        username: user.username,
    };

    let token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7D' });
    
    return token;
}

exports.register = async (userData) => {
    let isExisting = await User.findByUsername(userData.username)
    if(isExisting)
    {
        throw new Error('This username is already been used!')
    }
    return User.create(userData);
}    

exports.getAll = () => User.find().lean();
exports.getOne = (id) => User.findById(id).lean();