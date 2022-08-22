const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const AskHelp = require("../models/askHelp");

router.get('/ask-helps', authMiddleware, async (req, res) => {
    const askHelp = await AskHelp.find();
    res.send(askHelp);
});

router.post('/ask-helps', async (req, res) => {
    const {
        name,
        email,
        whatsapp,
        occupation,
        is_working,
        is_rent,
        cep,
        adress,
        is_visit
    } = req.body;

    const askHelp = new AskHelp({
        name,
        email,
        whatsapp,
        occupation,
        is_working,
        is_rent,
        cep,
        adress,
        is_visit
    })

    try {
        await askHelp.save()
        res.status(201).json({ msg: 'Dados enviado com sucesso enviada com sucesso!'})

    } catch (error) {
        console.log(error)
        throw error;
    }

});

module.exports = app => app.use(router);