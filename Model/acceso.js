const { Schema, model } = require('mongoose');

const accesoSchema = Schema({
    ruta: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model( 'Acceso', accesoSchema );