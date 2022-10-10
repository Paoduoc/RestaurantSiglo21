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
            //Primera validación, si el usuario(correo) es distinto al que se trae en el modelo
            if ( !usuario ) {
                return res.status( 400 ).json({
                    status: 400,
                    msg: 'Usuario y/o contraseña incorrecta'
                });
            }
            //Segunda validación, si el estado del usuario es false, no podrá ingresar
            if ( !usuario.estatus ) {
                return res.status( 400 ).json({
                    status: 400,
                    msg: 'Usuario y/o contraseña incorrecta'
                });
            }

            const pswvalida = bcryptjs.compareSync( contrasenna, usuario.contrasenna )
            //Tercera validación, si la contraseña es incorrecta luego de desencriptarla
            if ( !pswvalida ) {
                return res.status( 400 ).json({
                    status: 400,
                    msg: 'Usuario y/o contraseña incorrecta'
                });
            }
            //Si el usuario puede ingresar con exito se generara el token
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