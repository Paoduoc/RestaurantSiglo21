const { Schema, model } = require('mongoose');


//comentario de plato deberia ser individual al plato, es decir, deberia incluirse 
//  al añadir +1 al plato
const comandaSchema = Schema({
    estadoPedido:{
        type: String,
        default: "Pendiente"
    },
    plato: {
        type: Schema.ObjectId,
        ref: 'Pedido'
    },
    comentarioPlato: {
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model( 'Comanda', comandaSchema );