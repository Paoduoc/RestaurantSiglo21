const { Schema, model, now } = require('mongoose');

const logMesaSchema = Schema({
    
    fechaUsoMesa: {
        type: Date,
        default: now()
    },
    mesa: {
        type: Schema.ObjectId,
        ref: 'Mesa'
    }
});

module.exports = model( 'LogMesa', logMesaSchema );