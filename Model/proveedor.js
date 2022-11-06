const { Schema, model } = require('mongoose');

const proveedorSchema = Schema({
    nombreProvee: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    tipoProd:{
        type: String
    },
    ncontacto:{
        type: Number
    },
    correo:{
        type: String
    },
    direccion:{
        type: String
    }
});

module.exports = model( 'Provedor', proveedorSchema );