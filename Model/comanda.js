const { Schema, model } = require('mongoose');


//comentario de plato deberia ser individual al plato, es decir, deberia incluirse 
//  al añadir +1 al plato
const platoComanda = Schema({
    pedidoId: {
        type: String
    },
    plato: {
        type: Schema.ObjectId,
        ref: 'Plato'
    },
    estadoPedido:{
        type: String,
        default: "Pendiente"
    },
    comentarioPlato: {
        type: String
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