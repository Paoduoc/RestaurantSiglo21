const { Schema, model } = require('mongoose');

const comandaSchema = Schema({
    platos: {
        type: Schema.ObjectId,
        ref: 'Plato'
    },
    estado:{
        type: Boolean,
        default: true
    },
    pedido: {
        type: Schema.ObjectId,
        ref: 'Pedido'
    }
});

const cocinaSchema = Schema({
    comandaSchema: []
});

module.exports = model( 'Cocina', cocinaSchema );