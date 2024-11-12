const { Schema, model } = require('mongoose')

const scheduleSchema = new Schema({
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true,
    },
    type: {
        type: String,
        enum: ['lecture', 'workshop', 'seminar'],
        required: true,
    }
    
})

module.exports = model('Schedule', scheduleSchema)