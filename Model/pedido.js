const { Schema, model } = require('mongoose');

const pedidoSchema = Schema({
    platos: {
        type: Schema.ObjectId,
        ref: 'Plato'
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
    HoraEntrega: {
        type: String
    },
    mesa: {
        type: Schema.ObjectId,
        ref: 'Mesa'
    },
    garzon:{
        type: Schema.ObjectId,
        ref: 'Usuario'
    },
    comentarios: {
        type: String
    }
});

module.exports = model( 'Bodega', pedidoSchema );