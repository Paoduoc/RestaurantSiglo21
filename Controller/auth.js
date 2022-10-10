const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const usuarioModel = require('../Model/usuario.js');
const { generarJWT } = require('../helpers/token.js');

class Auth{

    login = async ( req = request,res = response ) => {
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

            const token = await generarJWT( usuario.id );

            res.status( 200 ).json({
                status: 200,
                msg: {usuario,token}
            });
            
        } catch (error) {
            console.log(error)
            res.status( 500 ).json({
                status: 500,
                msg: 'Error interno del controlador auth'
            });
        }
    }
}

module.exports = Auth