const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const Confirmation = require("../models/confirmation");

router.get('/confirmations', authMiddleware, async (req, res) => {
    const confirmation = await Confirmation.find();
    res.send(confirmation);
});

router.post('/confirmations', async (req, res) => {
    const {
        name,
        church,
        group,
        email,
        whatsapp,
        minister,
        url} = req.body;

    const confirmation = new Confirmation({
        name,
        church,
        group,
        email,
        whatsapp,
        minister,
        url
    })

    try {
        await confirmation.save()
        res.status(201).json({ msg: 'Confirmação enviada com sucesso enviada com sucesso!'})

    } catch (error) {
        console.log(error)
        throw error;
    }

});

module.exports = app => app.use(router);