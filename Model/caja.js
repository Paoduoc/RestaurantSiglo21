const { Schema, model } = require('mongoose');

const cajaSchema = Schema({
    boleta: {
        type: Schema.ObjectId,
        ref: 'Boleta'
    },
    estatus: {
        type: Number
    },
    total: {
        type: Number
    },
    metodo: {
        type: String
    }
});

module.exports = model( 'Caja', cajaSchema );