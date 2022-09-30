const { Schema, model } = require('mongoose');

const accesoSchema = Schema({
    path: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model( 'Acceso', accesoSchema );