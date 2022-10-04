const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const usuarioModel = require('../Model/usuario.js');

class Auth{

<<<<<<< HEAD
    registerForm = async (  req, res ) => {
        res.render("../public/signup");
    }

    register = async (  req, res ) => {
        const {username, password} = req.body;
=======
    login = async ( req = request,res = response ) => {
>>>>>>> 69d82e02021f56bbd6b4586d25a9b46eda3fc016
        try {

            const { correo, contrasenna } = req.body;
            const usuario = await usuarioModel.findOne( { correo } )
            .populate({path:'rol', select: 'nombre'});

            if ( !usuario ) {
                return res.status( 400 ).json({
                    status: 400,
                    msg: 'Usuario y/o contraseña incorrecta'
                });
            }

            if ( !usuario.estatus ) {
                return res.status( 400 ).json({
                    status: 400,
                    msg: 'Usuario y/o contraseña incorrecta'
                });
            }

            const pswvalida = bcryptjs.compareSync( contrasenna, usuario.contrasenna )

            if ( !pswvalida ) {
                return res.status( 400 ).json({
                    status: 400,
                    msg: 'Usuario y/o contraseña incorrecta'
                });
            }

            res.status( 200 ).json({
                status: 200,
                msg: {usuario}
            });
            
        } catch (error) {
            res.status( 500 ).json({
                status: 500,
                msg: 'Error interno del controlador auth'
            });
        }
    }
}

module.exports = Auth