const mongoose = require('mongoose');

const AskHelpSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    adress: {
        type: String,
        require: true,
    },

    cep: {
        type: String,
        require: true,
    },

    is_rent: {
        type: String,
        require: true,
    },

    is_visit: {
        type: String,
        require: true,
    },

    is_working: {
        type: String,
        require: true,
    },

    occupation: {
        type: String,
        require: true,
    },

    whatsapp: {
        type: String,
        require: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const askHelp = mongoose.model('AskHelp', AskHelpSchema);

module.exports = askHelp;