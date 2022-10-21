const { Schema, model } = require('mongoose');

const mesaSchema = Schema({
    numMesa: {
        type: Number
    },
    estado: {
        type: Boolean,
        default: true
    },
    cantSillas: {
        type: Number
    }
});

module.exports = model( 'Mesa', mesaSchema );