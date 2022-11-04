const { Schema, model } = require('mongoose');

const menuSchema = Schema({
    
    nombreMenu: {
        type: String
    },
    platos: {
        type: Schema.ObjectId,
        ref: 'Plato'
    },
    bodega: {
        type: Schema.ObjectId,
        ref: 'Bodega'
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model( 'Menu', menuSchema );