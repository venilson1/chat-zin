const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const DoPart = require("../models/doPart");

router.get('/do-parts', authMiddleware, async (req, res) => {
    const doPart = await DoPart.find();
    res.send(doPart);
});

router.post('/do-parts', async (req, res) => {
    const {
        name,
        email,
        whatsapp,
        cep,
        adress,
        date
    } = req.body;

    const doPart = new DoPart({
        name,
        email,
        whatsapp,
        cep,
        adress,
        date
    })

    try {
        await doPart.save();
        res.status(201).json({ msg: 'Dados enviado com sucesso enviada com sucesso!'});

    } catch (error) {
        console.log(error);
        throw error;
    }

});

module.exports = app => app.use(router);