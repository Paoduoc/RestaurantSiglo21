const { Schema, model } = require('mongoose');

const bodegaSchema = Schema({

    nombreProducto: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    cantidad:{
        type: Number
    },
    cantidadMin: {
        type: Number
    }
});

module.exports = model( 'Bodega', bodegaSchema );