const usuario = require('../Model/usuario');
let roles = require('../Model/rol');
const acceso = require('../Model/acceso');
const mesa = require('../Model/mesa');
const producto = require('../Model/producto');

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
/* const productoValidador = async ( nombreProducto = '' ) => {
    const nombreValido = await producto.findOne( {nombreProducto} );
    if( nombreValido ){
        throw new Error(`El producto con el nombre ${nombreProducto} ya está registrado`);
    }
}
const PlatoValidador = async ( nombrePlato = '' ) => {
    const nombreValido = await producto.findOne( {nombrePlato} );
    if( nombreValido ){
        throw new Error(`El plato con el nombre ${nombrePlato} ya está registrado`);
    }
}
 */
module.exports = { 
    idUsuarioValidador, 
    rutUsuarioValidador,
    correoUsuarioValidador,
    rolValidador,
    estadoValidor,
    rutaValidador,
    rolRepetidoValidador,
    mesaValidador,
    //productoValidador,

};
