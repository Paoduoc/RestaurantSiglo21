const { Schema, model } = require('mongoose');

const menuSchema = Schema({
    //siempre tendra la coleccion igual y mostrara los platos que esten en true
    
    nombreMenu: {
        type: String
    },
    platos: {
        type: Array
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model( 'Menu', menuSchema );