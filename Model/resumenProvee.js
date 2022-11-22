const { Schema, model } = require('mongoose');

const resumenProveeSchema = Schema({
    resumenes: {
        type: Array
    },
    /* producto:{
        type: Schema.ObjectId,
        ref: 'Producto'
    },
    gramos:{
        type: Number
    },
    proveedor:{
        type: Schema.ObjectId,
        ref: 'Proveedor'
    }, */
    fecha:{
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    } 
});

module.exports = model( 'resumenProvee', resumenProveeSchema );