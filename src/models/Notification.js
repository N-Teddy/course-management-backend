const { Schema, model } = require('mongoose')

const notificationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receivers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    type: {
        type: String,
        enum: ['message', 'like', 'comment'],
        required: true,
        default: 'message'
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = model('Notification', notificationSchema)