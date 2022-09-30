const { Schema, model } = require('mongoose');

const proovedorSchema = Schema({
    nombre: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    tipoProducto: {
        type: String
    }
});

module.exports = model( 'Proovedor', proovedorSchema );