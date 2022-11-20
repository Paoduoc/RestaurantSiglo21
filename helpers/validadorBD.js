const usuario = require('../Model/usuario');
let roles = require('../Model/rol');
const acceso = require('../Model/acceso');
const mesa = require('../Model/mesa');
const producto = require('../Model/producto');
const accesRol = require('../Model/accesoRol');
const plato = require('../Model/plato');
const reser= require('../Model/reservas');
const transac= require('../Model/transaccion');

//validador de que le usuario exista según mongoID
const idUsuarioValidador = async ( id = '' ) => {

    const idValido = await usuario.findById( id );
    if( !idValido ){
        throw new Error(`El usuario no existe`);
    }

}
//Validador de duplicidad de correo
const correoUsuarioValidador = async ( correo = '' ) => {

    const correoValido = await usuario.findOne( {correo:correo} );
    if( correoValido ){
        throw new Error(`El correo ${correo} ya esta registrado`);
    }

}
//Validador de existencia de rol
const rolValidador = async ( rol = '' ) => {

    const rolValido = await roles.findById( rol );
    if( !rolValido ){
        throw new Error(`El usuario con el rol ${rol} no existe`);
    }

}
//Validador de duplicidad de ruta
const rutaValidador = async ( ruta = '' ) => {

    const rutaValida = await acceso.findOne( {ruta:ruta} );
    if( rutaValida ){
        throw new Error(`La ruta ${ruta} ya esta registrada`);
    }
}
//validador de duplicidad de rol
const rolRepetidoValidador = async ( nombre = '' ) => {

    const validaRol = await roles.findOne( {nombre:nombre} );
    if( validaRol ){
        throw new Error(`El rol ${nombre} ya esta registrado`);
    }

}
//validador de duplicidad de mesa
const mesaValidador = async ( numMesa = '' ) => {

    const validaMesa = await mesa.findOne( {numMesa:numMesa} );
    if( validaMesa ){
        throw new Error(`La mesa ${numMesa} ya esta registrada`);
    }

}
const rutValidador = async ( rut = '' ) => {

    if( rut != '' ){
        throw new Error(`El rut no se puede modificar`);
    }
}
const estatusValidador = async ( estatus = '' ) => {

    if( estatus != '' ){
        throw new Error(`El estatus no se puede modificar en este endpoint`);
    }
}
const accesoRolValidador = async ( rol = '' ) => {

    const accesRolValida = await accesRol.findOne( {rol:rol} )
    .populate({path:"rol",select:"nombre"})
    let nombre = accesRolValida.rol.nombre
    if( accesRolValida ){
        throw new Error(`La ruta con el rol ${nombre} ya existe`);
    }
}

//PRODUCTOS
//validador de duplicidad de producto
const productoRepetidoValidador = async ( nombreProducto = '', { req }) => {
    const mongoId = req.params.id;
    let productos = await producto.find( {nombreProducto} );
    productos = productos.filter(p => p._id.toString() !== mongoId);
    if( productos.length === 1 ){
        throw new Error(`El producto ${nombreProducto} ya esta registrado`);
    }
}

//PLATOS
//validador de duplicidad de platos
const platoRepetidoValidador = async ( nombrePlato = '' ) => {
    const validaPlato = await plato.findOne( {nombrePlato} );
    if( validaPlato ){
        throw new Error(`El plato ${nombrePlato} ya esta registrado`);
    }
}

const reservaValidador = async ( mesa = '' ) => {

    const reservado = await reser.findOne( {mesa:mesa, reservada:true})
    if( reservado ){
        throw new Error(`Esta mesa ya esta en uso, debe generar un sobrecupo`);
    }
}
const sobrecupoValidador = async ( id = '' ) => {

    console.log(id)

    const sCupo = await reser.findOne( {_id:id, sobrecupo: true})
    if( sCupo ){
        // throw new Error(`Debe estar vigente la reserva para generar un sobrecupo`);
    }
}

//PEDIDO
const garzonValidador = async ( rol = '' ) => {
    const rolV = await roles.findById( rol );
    
    if (rolV.nombre != "Garzon") {
        throw new Error("El usuario debe ser un garzón");
    }
    
}

//VALIDADORES TRANSACCIONES - FLOW
const secretValidador = async ( secret = '' ) => {

    if( secret != process.env.FLOW_INTER_SECRET_KEY ){
        throw new Error("La secret key es requerida");
    }
}

const idServiceMovValidador = async ( id = '' ) => {

    const idValido = await transac.findById( id );
    if( !idValido ){
        throw new Error(`La transacción no existe`);
    }

}
module.exports = { 
    idUsuarioValidador, 
    correoUsuarioValidador,
    rolValidador,
    rutaValidador,
    rolRepetidoValidador,
    mesaValidador,
    rutValidador,
    estatusValidador,
    accesoRolValidador,
    productoRepetidoValidador,
    platoRepetidoValidador,
    reservaValidador,
    sobrecupoValidador,
    garzonValidador,
    secretValidador,
    idServiceMovValidador
};
