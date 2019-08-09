// createAt:date
//content:string
//view: num
//imageUrl:String
//author:User

const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    createAt: {
        type: Date,
        default: new Date(),
    },
    content: {
        type: String,
        require: true,
    },
    view: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;