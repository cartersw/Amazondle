const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }

}, {timestamps:true})


const User = mongoose.model('User', userSchema);
module.exports = User;