const { Schema, model } = require('mongoose');

const platoSchema = Schema({
    nombrePlato: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
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
        type: String
    }
});

module.exports = model( 'Plato', platoSchema );