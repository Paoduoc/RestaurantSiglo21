const { Schema, model } = require('mongoose');


//comentario de plato deberia ser individual al plato, es decir, deberia incluirse 
//  al añadir +1 al plato
const platoComanda = Schema({
    pedido: {
        type: Schema.ObjectId,
        ref: 'Pedido'
    },
    mesa: {
        type: Schema.ObjectId,
        ref: 'Mesa'
    },
    plato: {
        type: Schema.ObjectId,
        ref: 'Plato'
    },
    fechaIP: {
        type: String
    },
    estadoPedido:{
        type: String,
        default: "Pendiente"
    },
    comentarioPlato: {
        type: String
    },
    comentarioDevolucion: {
        type: String
    },
    fechaTP: {
        type: String,
        default: "Pendiente"
    },
    estado:{
        type: Boolean,
        default: true
    }
}, { _id : false });

const comandaSchema = Schema({
    platosComanda : [platoComanda]
});

module.exports = model( 'Comanda', comandaSchema );