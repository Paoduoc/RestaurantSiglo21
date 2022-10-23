const { Schema, model } = require('mongoose');

const pedidoSchema = Schema({
    platos: {
        type: Array
    },
    estado: {
        type: Boolean,
        default: false
    },
    fechaIP:{
        type: String
    },
    fechaTP: {
        type: String,
        default: 'Pendiente'
    },
    reserva: {
        type: Schema.ObjectId,
        ref: 'Reserva'
    },
    garzon:{
        type: Schema.ObjectId,
        ref: 'Usuario'
    },
    comentariosPlato: {
        type: String
    },
    comentariosDevolucion: {
        type: String
    },
    preciosU: {
        type: Array
    },
    totalPedido: {
        type: Number,
        default: 0
    }
});

module.exports = model( 'Pedido', pedidoSchema );