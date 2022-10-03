const usuario = require('../Model/usuario');

const idUsuarioValidador = async ( id = '' ) => {

    const valido = await usuario.findById( id );
    if( !valido ){
        throw new Error(`El usuario no existe`);
    }

}
const rutUsuarioValidador = async ( rut = '' ) => {

    const usuario = await usuario.findById( {rut:rut} );
    if( !usuario ){
        throw new Error(`El usuario con el rut ${rut} no existe`);
    }

}
const correoUsuarioValidador = async ( correo = '' ) => {

    const usuario = await usuario.findById( {correo:correo} );
    if( !usuario ){
        throw new Error(`El usuario con el correo ${correo} no existe`);
    }

}
module.exports = { 
    idUsuarioValidador, 
    rutUsuarioValidador,
    correoUsuarioValidador
};
