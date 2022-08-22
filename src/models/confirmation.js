const mongoose = require('mongoose');

const ConfirmationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    church: {
        type: String,
        require: true,
    },

    group: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    whatsapp: {
        type: String,
        require: true,
    },

    minister: {
        type: String,
        require: true,
    },

    url: {
        type: String,
        require: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const confirmation = mongoose.model('Confirmation', ConfirmationSchema);

module.exports = confirmation;