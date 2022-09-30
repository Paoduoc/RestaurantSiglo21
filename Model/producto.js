const { Schema, model } = require('mongoose');

const productoSchema = Schema({
    nombreProd: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    cantidad: {
        type: String
    },
    tipoProd:{
        type: String
    }
});

module.exports = model( 'Producto', productoSchema );