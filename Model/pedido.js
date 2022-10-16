const { Schema, model } = require('mongoose');

const pedidoSchema = Schema({
    platos: {
        type: Array
    },
    estado: {
        type: Boolean,
        default: true
    },
    fechaPedido:{
        type: Date
    },
    horaPedido: {
        type: String
    },
    horaEntrega: {
        type: String
    },
    reserva: {
        type: Schema.ObjectId,
        ref: 'Reserva'
    },
    garzon:{
        type: Schema.ObjectId,
        ref: 'Usuario'
    },
    comentarios: {
        type: String
    },
    totalPedido: {
        type: Number
    }
});

module.exports = model( 'Bodega', pedidoSchema );