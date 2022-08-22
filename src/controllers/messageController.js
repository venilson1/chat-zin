const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const Message = require("../models/message");

router.get('/messages', authMiddleware, async (req, res) => {
    const messages = await Message.find();
    res.send(messages);
});

router.post('/messages', async (req, res) => {
    const {email, message } = req.body;

    const msg = new Message({
        email,
        message
    })

    try {
        await msg.save();
        res.status(201).json({ msg: 'Mensagem enviada com sucesso!' });

    } catch (error) {
        console.log(error);
        throw error;
    }

});

module.exports = app => app.use(router);