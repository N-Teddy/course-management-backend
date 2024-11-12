const mongoose = require('mongoose');
const { Schema } = mongoose;

const userOTPSchema = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    expired_at: {
        type: Date,
        required: false
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now
    }
});

module.exports = mongoose.model('userOTP', userOTPSchema);
