const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/home', authMiddleware, (req, res) => {
    res.render('../views/home');;
});

module.exports = app => app.use('/admin', router);