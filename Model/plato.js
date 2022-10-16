const { Schema, model } = require('mongoose');

const platoSchema = Schema({
    nombrePlato: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    categoria: {
        type: String
    },
    ingredientes: {
        type: Array
    },
    preparacion: {
        type: String
    },
    tiempoPreparacion: {
        type: String
    },
    precio: {
        type: Number
    },
    imagen: {
        data: Buffer,
        contentType: String
    }
});

module.exports = model( 'Plato', platoSchema );