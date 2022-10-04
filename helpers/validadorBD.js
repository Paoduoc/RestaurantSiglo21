const usuario = require('../Model/usuario');
const rol = require('../model/rol');

const idUsuarioValidador = async ( id = '' ) => {

    const idValido = await usuario.findById( id );
    if( !idValido ){
        throw new Error(`El usuario no existe`);
    }

}
const rutUsuarioValidador = async ( rut = '' ) => {

    const rutValido = await usuario.findOne( {rut:rut} );
    if( !rutValido ){
        throw new Error(`El usuario con el rut ${rut} no existe`);
    }

}
const correoUsuarioValidador = async ( correo = '' ) => {

    const correoValido = await usuario.findOne( {correo:correo} );
    if( !correoValido ){
        throw new Error(`El usuario con el correo ${correo} no existe`);
    }

}
const rolValidador = async ( rol = '' ) => {

    const rolValido = await rol.findById( {rol:rol} );
    if( !rolValido ){
        throw new Error(`El usuario con el correo ${correo} no existe`);
    }

}
module.exports = { 
    idUsuarioValidador, 
    rutUsuarioValidador,
    correoUsuarioValidador,
    rolValidador
};
