const { Schema, model } = require('mongoose');

const accesoRolSchema = Schema({
    acceso: {
        type: Schema.ObjectId,
        ref: 'Acceso'
    },
    rol: {
        type: Schema.ObjectId,
        ref: 'Rol'
    },
    estado: {
        type: Boolean,
        default: true
    },
    crear: {
        type: Boolean,
        default: false
    },
    modificar: {
        type: Boolean,
        default: false
    },
    leer: {
        type: Boolean,
        default: false
    },
    eliminar: {
        type: Boolean,
        default: false
    }
});

module.exports = model( 'AccesoRol', accesoRolSchema );