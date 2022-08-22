const mongoose = require('mongoose');

const DoPartSchema = new mongoose.Schema({
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

    whatsapp: {
        type: String,
        require: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const doPart = mongoose.model('DoPart', DoPartSchema);

module.exports = doPart;