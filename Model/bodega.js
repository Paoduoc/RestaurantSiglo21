const { Schema, model } = require('mongoose');

const bodegaSchema = Schema({
    productosBodega: [] 
});

module.exports = model( 'Bodega', bodegaSchema );