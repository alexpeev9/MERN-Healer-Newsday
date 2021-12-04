const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: [/^[a-zA-Z0-9]+$/ ,'Username should consist of only english letters and digits'],
        minLength: [3, 'Username cannot be less than 3 characters'],
        maxLength: [15, 'Username cannot be more than 10 characters']
    },
    firstName: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z]+$/ ,'FirstName should consist of only english letters'],
        minLength: [3, 'FirstName cannot be less than 3 characters'],
        maxLength: [15, 'FirstName cannot be more than 10 characters']
    },
    lastName: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z]+$/ ,'LastName should consist of only english letters'],
        minLength: [3, 'LastName cannot be less than 3 characters'],
        maxLength: [15, 'LastName cannot be more than 10 characters']

    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'Password cannot be less than 4 characters'],
        maxLength: [15, 'Password cannot be more than 10 characters']
    },
})

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hash => {
            this.password = hash;
            next();
        });
});

userSchema.static('findByUsername', function(username) {
    return this.findOne({username});
});

userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;