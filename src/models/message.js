const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const message = mongoose.model('Message', MessageSchema);

module.exports = message;