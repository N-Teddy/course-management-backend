const { Schema, model } = require('mongoose')

const instructorSchema = new Schema({
    specialty: {
        type: 'String',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: null
    }
})

module.exports = model('Instructor', instructorSchema)