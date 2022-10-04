const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
//const { generarJWT, googleVerify, generatePassword } = require('../../helpers/auth');
const jwt = require("jsonwebtoken");

const Usuario = require('../Model/usuario.js');

class Auth{

    registerForm = async (  req, res ) => {
        res.render("../public/signup");
    }
//hola
    register = async (  req, res ) => {
        const {username, password} = req.body;
        try {
            let User = await Usuario.findOne({username:username});
            if(User) throw new Error('Ya existe ese usuario');

            User  = new Usuario({username, password});

            await User.save();
            res.json(User);
            
        } catch (error) {
            res.json({error: error.message});
        }
        res.json(req.body);
    }

    loginForm = async (  req, res ) => {
        res.render("../public/signin");
    }

    login = async (  req, res ) => {
        const {username, password} = req.body;
        try {
            let User = await Usuario.findOne({username:username});
            if(!User) throw new Error('Error! usuario no existe');

            if(await User.comparePassword(password)) throw new Error('Error! contraseña incorrecta');

            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

module.exports = Auth