const { Schema, model } = require('mongoose');

const bodegaSchema = Schema({
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