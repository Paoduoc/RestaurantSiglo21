const { Schema, model } = require('mongoose');

const transaccionSchema = Schema({
    boleta: {
        type: Schema.ObjectId,
        ref: 'Boleta'
    },
    estatus: {
        type: Number,
        default: 1
    },
    total: {
        type: Number
    },
    metodo: {
        type: String
    },
    token: {
        type: String,
        default: "Pendiente"
    }
});

module.exports = model( 'Transaccion', transaccionSchema );