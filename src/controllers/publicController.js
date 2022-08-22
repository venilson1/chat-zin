const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Rotas
router.get('/', (req, res) => {
    res.render('../views/pages/index');
})

router.get('/sobre', (req, res) => {
    res.render('../views/pages/sobre');
})

router.get('/confirmacao', (req, res) => {
    res.render('../views/pages/confirmacao');
})

router.get('/projeto-believer', (req, res) => {
    res.render('../views/pages/projeto_believer');
})

router.get('/evento', (req, res) => {
    res.render('../views/pages/evento');
})

router.get('/peca-ajuda', (req, res) => {
    res.render('../views/pages/ask-help');
})

router.get('/faca-parte', (req, res) => {
    res.render('../views/pages/do-part');
})

module.exports = app => app.use(router);