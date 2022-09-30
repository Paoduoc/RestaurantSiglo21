const { Schema, model } = require('mongoose');

const mesaSchema = Schema({
    numMesa: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    cantSillas: {
        type: String
    }
});

module.exports = model( 'Mesa', mesaSchema );