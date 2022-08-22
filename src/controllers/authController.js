const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const User = require("../models/user");

const router = express.Router();

require('dotenv').config();

router.get('/login', (req, res) => {
    res.render('../views/login');
})

router.post('/register', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body

    // Validations
    if (!name) {
        return res.json({ status: 'error', error: 'O nome é obrigatório.' })
    }

    if (!email) {
        return res.json({ status: 'error', error: 'O email é obrigatório.' })
    }

    if (!password) {
        return res.json({ status: 'error', error: 'A senha é obrigatória.' })
    }

    if (password !== confirmpassword) {
        return res.json({ status: 'error', error: 'As senhas não coincidem.' })
    }

    const userExists = await User.findOne({ email: email })
    
    if (userExists) {
        return res.status(200).json({ msg: 'Email já utilizado.'})
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password: passwordHash
    })

    try {
        await user.save()
        res.status(201).json({ msg: 'Usuario criado com sucesso.' })

    } catch (error) {
        console.log(error)
        throw error;
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).lean();

    if(!user){
        return res.status(403).json({
            error: "invalid login",
        });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(403).json({
          error: "invalid login",
        });
    }

    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: true
    });
    
    res.json({ status: 'ok', data: token })
})

module.exports = app => app.use('/auth', router)