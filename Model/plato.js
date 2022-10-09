const { Schema, model } = require('mongoose');

const platoSchema = Schema({
    nombrePlato: {
        type: String,
        unique: true,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    nombre: {
        type: Schema.ObjectId,
        ref: 'BodegaCocina'
    },
    //este deberia ser una lista
    //llama al schema bodegacocina 
    //se llama por el object ID (es decir, llama al id de producto en bodega cocina)
    //por eso quiza es mejor ponerle nombreProducto, porque aqui por ejemplo se llamara 2 veces a nombre
    preparacion: {
        type: String
    },
    tiempoPreparacion: {
        type: String
    },
    precio: {
        type: String
    }
});

module.exports = model( 'Plato', platoSchema );