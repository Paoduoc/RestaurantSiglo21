const { Schema, model } = require('mongoose');

const boletaSchema = Schema({
    platos: {
        type: Schema.ObjectId,
        ref: 'Plato'
    }
});

module.exports = model( 'Boleta', boletaSchema );