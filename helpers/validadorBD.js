const usuario = require('../Model/usuario');
let roles = require('../Model/rol');
const acceso = require('../Model/acceso');
const mesa = require('../Model/mesa');

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
    if( correoValido ){
        throw new Error(`El correo ${correo} ya esta registrado`);
    }

}
const rolValidador = async ( rol = '' ) => {

    const rolValido = await roles.findById( rol );
    if( !rolValido ){
        throw new Error(`El usuario con el rol ${rol} no existe`);
    }

}
const estadoValidor = async ( id = '' ) => {
    const usuario = await usuario.findById( id );
    if( !usuario.estado ){
        throw new Error(`El usuario ya ha sido deshabilitado`);
    }
}
const rutaValidador = async ( ruta = '' ) => {

    const rutaValida = await acceso.findOne( {ruta:ruta} );
    if( rutaValida ){
        throw new Error(`La ruta ${ruta} ya esta registrada`);
    }
}
const rolRepetidoValidador = async ( rol = '' ) => {

    const validaRol = await roles.findOne( {rol:rol} );
    if( validaRol ){
        throw new Error(`El rol ${rol} ya esta registrado`);
    }

}
const mesaValidador = async ( numMesa = '' ) => {

    const validaMesa = await mesa.findOne( {numMesa:numMesa} );
    if( validaMesa ){
        throw new Error(`La mesa ${numMesa} ya esta registrada`);
    }

}
module.exports = { 
    idUsuarioValidador, 
    rutUsuarioValidador,
    correoUsuarioValidador,
    rolValidador,
    estadoValidor,
    rutaValidador,
    rolRepetidoValidador,
    mesaValidador
};
