const { Schema, model } = require('mongoose');

const boletaSchema = Schema({
    pedidoID: {
        type: Schema.ObjectId,
        ref: 'Pedido'
    },
    estado:{
        type: Boolean,
        default: true
    },
    fechaB:{
        type: String
    }

});

module.exports = model( 'Boleta', boletaSchema );