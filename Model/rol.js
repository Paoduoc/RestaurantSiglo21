const { Schema, model } = require('mongoose');

const rolSchema = Schema({
    nombre: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model( 'Rol', rolSchema );