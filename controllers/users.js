const { response, request } = require('express');
const  bcrypt  = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const usersGet = async (req = request, res = response) => {
    const body = req.body;
    const userFound = await User.findOne({ email: body.email });
    if (!userFound){
        return res.status(500).json({
            message: 'El usuario no existe.'
        })
    }
    const matchPassword = await bcrypt.compare(body.password, userFound.password);
    if (!matchPassword){
        res.status(200).json({
            message: 'La contraseña es incorrecta.'
        })
    } 
    res.status(200).json({
        message: 'Ingreso exitoso'
    })
};
const usersPost = async (req = request, res = response) => {
    const body = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(body.password, salt, async function (err, hash) {
            if (err) {
                console.log(err);
            } else {
                const nickname = await User.findOne({ nickname: body.nickname });
                const email = await User.findOne({ email: body.email });
                if (!nickname && !email){
                    const newUser = new User({
                        ...body,
                        password: hash
                    })
                    // Create a token
                    const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
                        expiresIn: 86400, // 24 hours
                    });
                    newUser.save();
                    res.status(201).json({
                        token: token,
                    })
                } else {
                    res.status(500).json({
                        message: 'El nickname o email ya existen.'
                    })
                }
            }
        });
    });
};
const usersPut = (req = request, res = response) => {
    const { id } = req.params;
    res.status(200).json({
        id: id
    })
};
const usersPatch = (req = request, res = response) => {
    res.status(200).json({
        message: 'Patch API'
    })
};
const usersDelete = (req = request, res = response) => {
    res.status(200).json({
        message: 'Delete API'
    })
};
module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}