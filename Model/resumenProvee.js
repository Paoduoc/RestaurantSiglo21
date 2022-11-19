const { Schema, model } = require('mongoose');

const resumenProveeSchema = Schema({
    proveedor:{
        type: Schema.ObjectId,
        ref: 'Proveedor'
    },
    estado:{
        type: Boolean,
        default: true
    },
    fecha:{
        type: String
    },
    producto:{
        type: Schema.ObjectId,
        ref: 'Producto'
    },
    gramos:{
        type: Number
    }
});

module.exports = model( 'resumenProvee', resumenProveeSchema );