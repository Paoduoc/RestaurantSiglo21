const { Schema, model, now } = require('mongoose');

const reservaSchema = Schema({
    
    fechaIngreso: {
        type: String
    },
    fechaSalida: {
        type: String,
        default: "Pendiente"
    },
    mesa: {
        type: Schema.ObjectId,
        ref: 'Mesa'
    },
    reservada: {
        type: Boolean,
        default: false
    },
    sobrecupo: {
        type: Boolean,
        default: false
    }
});

module.exports = model( 'Reserva', reservaSchema );