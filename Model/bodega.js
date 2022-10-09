const { Schema, model } = require('mongoose');

const bodegaSchema = Schema({
    //con helpers se pueden controlar que sea unico y que sea requerido
    nombreProducto: {
        type: Schema.ObjectId,
        ref: 'Producto'
    },
    estado: {
        type: Boolean,
        default: true
    },
    gramosDispo:{
        type: String
    },
    gramosMin: {
        type: String
    },
    gramosMax: {
        type: String
    }
});

module.exports = model( 'Bodega', bodegaSchema );