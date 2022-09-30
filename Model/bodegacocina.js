const { Schema, model } = require('mongoose');

const bodegaCocinaSchema = Schema({
    nombreProducto: {
        type: Schema.ObjectId,
        ref: 'Bodega'
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

module.exports = model( 'BodegaCocina', bodegaCocinaSchema );