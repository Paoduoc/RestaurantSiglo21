const { Schema, model } = require('mongoose');

const comandaSchema = Schema({
    estado:{
        type: Boolean,
        default: true
    },
    pedido: {
        type: Schema.ObjectId,
        ref: 'Pedido'
    }
});

module.exports = model( 'Comanda', comandaSchema );