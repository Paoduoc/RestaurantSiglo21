const { Schema, model } = require('mongoose');

const productoSchema = Schema({
    nombre: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    cantidad: {
        type: String
    },
    tipo:{
        type: String
    }
});

module.exports = model( 'Producto', productoSchema );