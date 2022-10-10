const { Schema, model, now } = require('mongoose');

const logMesaSchema = Schema({
    
    fechaIngreso: {
        type: Date,
        default: now()
    },
    fechaSalida: {
        type: Date,
        default: now()
    },
    mesa: {
        type: Schema.ObjectId,
        ref: 'Mesa'
    },
    reservada: {
        type: Boolean,
        default: false
    }
    
});

module.exports = model( 'LogMesa', logMesaSchema );