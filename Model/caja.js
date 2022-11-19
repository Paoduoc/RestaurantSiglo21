const { Schema, model } = require('mongoose');

const cajaSchema = Schema({
    boleta: {
        type: Schema.ObjectId,
        ref: 'Boleta'
    },
    pagado: {
        type: Boolean,
        default: false
    },
    total: {
        type: Number
    },
    metodo: {
        type: String
    }
});

module.exports = model( 'Caja', cajaSchema );