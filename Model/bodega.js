const { Schema, model } = require('mongoose');

const productosBodega = Schema({
    nombreProducto: {
        type: String
    },
    estado: {
        type: Boolean
    },
    cantidad: {
        type: Number
    },
    cantidadMin: {
        type: Number
    }
})

const bodegaSchema = Schema({
    productosBodega: []
});

module.exports = model( 'Bodega', bodegaSchema );