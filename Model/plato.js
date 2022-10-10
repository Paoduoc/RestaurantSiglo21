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
    ingredientes: {
        type: Array
    },
    //tener un documento de ingredientes y otro de cdantidad de gramos de este ingrediente siento que seria demasiado complejo
    //quiza seria mejor tener ingredientes con los gramos ya especificados. ej: bolsa choclo 200g - bolsa choclo 500g
    //asi nos ahorramos una capa de complejidad y tendriamos directamente que llamar a solo ingredientes, que serian ingredientes con los gramos listos    //llama al schema bodegacocina 
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