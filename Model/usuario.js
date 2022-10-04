const bcrypt = require('bcryptjs/dist/bcrypt');
const async = require('hbs/lib/async');
const mongoose = require('mongoose')
const {Schema, now} = mongoose

const saltRounds = 10; 

const usuarioSchema = new Schema({
    /* nombre: {
        type: String,
        default: "Default"
    },
    apellido: {
        type: String,
        default: "Default"
    }, */
    /* rut: {
        type: String,
    }, */
    username: {
        type: String,
        lowerCase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    /* correo: {
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
    } */
})

//encrypt
usuarioSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        
        const document = this;

        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if(err){
                next(err);
            }else {
                document.password = hashedPassword;
                next();
            }
        });
    }else {
        next();
    }
});


//corroborar si la contra del user esta bien
usuarioSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
};

const Usuario = mongoose.model('Usuario', usuarioSchema)
module.exports = Usuario;