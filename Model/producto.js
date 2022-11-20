const { Schema, model } = require('mongoose');

const productoSchema = Schema({
    nombreProducto: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    tipo:{
        type: String
    }
});

module.exports = model( 'Producto', productoSchema );