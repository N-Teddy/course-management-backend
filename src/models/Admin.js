const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: null
    }
})

module.exports = model('Admin', adminSchema)