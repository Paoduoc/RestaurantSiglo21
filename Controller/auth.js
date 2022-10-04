const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
//const { generarJWT, googleVerify, generatePassword } = require('../../helpers/auth');
const jwt = require("jsonwebtoken");

const Usuario = require('../Model/usuario.js');

class Auth{

<<<<<<< HEAD
    login = async (  req=request, res=response ) => {
=======
    registerForm = async (  req, res ) => {
        res.render("../public/signup");
    }
>>>>>>> 7fab138c548e3cb9a0b746b68094755f426cfcbe

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