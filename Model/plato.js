const { Schema, model } = require('mongoose');

// const recetas = Schema({
//     nombrePlato: {
//         type: String
//     },
//     estado: {
//         type: Boolean,
//         default: true
//     },
//     categoria: {
//         type: String
//     },
//     ingredientes: {
//         type: Array
//     },
//     preparacion: {
//         type: String
//     },
//     minutosPreparacion: {
//         type: Number
//     },
//     precio: {
//         type: Number
//     },
//     imagen: {
//         data: Buffer,
//         contentType: String
//     },
//     mostrar: {
//         type: Boolean,
//         default: false
//     }
// });

const platoSchema = Schema({
    recetas: {
        type: Array
    }
})

module.exports = model( 'Plato', platoSchema );