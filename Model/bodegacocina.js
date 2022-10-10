const { Schema, model } = require('mongoose');

const bodegaCocinaSchema = Schema({
    nombreProducto: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    gramosDispo:{
        type: String,
        default: "0"
    },
    gramosMin: {
        type: String
    },
    gramosMax: {
        type: String
    }
});

module.exports = model( 'BodegaCocina', bodegaCocinaSchema );