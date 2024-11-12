const { required } = require('joi')
const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
    title: {
        type: 'String',
        required: true
    },
    description: {
        type: 'String',
        required: true
    },
    duration: {
        type: 'String',
        required: true
    },
    category: {
        type: String,
        enum: ['web development', 'cyber security', 'grapic design', 'digital marketing'],
        required: true,
    }
})

module.exports = model('Course', courseSchema)