const mongoose = require('mongoose')
const {Schema, now} = mongoose

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        default: "Default"
    },
    apellido: {
        type: String,
        default: "Default"
    },
    rut: {
        type: String,
    },
    contrasenna: {
        type: String,
        default: "Default"
    },
    correo: {
        type: String,
        default: "Default"
    },
    celular: {
        type: String,
        default: "Default"
    },
    fechaCumpleannos: {
        type: Date,
        default: now()
    },
    rol: {
        type: Schema.ObjectId,
        ref: 'Rol'
    },
    estatus: {
        type: Boolean,
        default: true
    },
    genero: {
        type:String,
        default: "Default"
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)
module.exports = Usuario;