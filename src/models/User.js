const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        type: String,
        required: false,
        default: 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png'
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'instructor'],
        default: 'student'
    }
})

module.exports = model('User', userSchema)