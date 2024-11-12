const { Schema, model } = require('mongoose')

const studentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: null
    }
})

module.exports = model('Student', studentSchema)