//email => require,unique
//password => required
//fullname => required
//createdAt 

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    fullName:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: new Date(),
    },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;