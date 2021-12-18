const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [20, 'Title cannot be less than 3 characters'],
        maxLength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        required: true,
        type: String,
        minLength: [400, 'Description cannot be less than 100 characters'],
        maxLength: [4000, 'LastName cannot be more than 10 characters']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//i, 'Invalid ImageURL']
    },
    creator: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    votes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    rating: {
        type: Number,
        default: 0
    }
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;