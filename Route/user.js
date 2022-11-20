const { Router, response } = require('express');
const { check } = require('express-validator');
const { idUsuarioValidador, correoUsuarioValidador, rolValidador, estadoValidor, rutValidador, estatusValidador } = require('../helpers/validadorBD');
const router = Router();
const User = require('../Controller/user');
const { validadorCampos } = require('../middlewares/validadorCampos');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const user = new User();

//se setea en todas las rutas definidas abajo
router.use(validaAccesoToken)

//obtiene todos los usuarios
router.get('/',( req , res ) =>{ user.getAllUsuario( req, res ) });

//obtiene un usuario por ID mongodb
router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    check('id').custom(idUsuarioValidador),
    validadorCampos
    ],( req , res ) =>{ user.getUsuario( req, res ) });

//Genera nuevos usuarios
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( correoUsuarioValidador ),
    check('contrasenna','La contraseña debe tener mínimo 8 caracteres.').isLength({ min: 8 }),
    check('rol','no es un id mongodb').isMongoId(),
    check('rut','El Rut es obligatorio').not().isEmpty(),
    check('rol').custom( rolValidador ),
    validadorCampos
    ],( req , res ) =>{ user.postUsuario( req, res ) });

//Modifica usuarios por ID mongodb
router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    check('id').custom( idUsuarioValidador ),
    check('correo').custom( correoUsuarioValidador ),
    check('rut','El rut no se puede modificar').custom(rutValidador),
    check('estatus').custom(estatusValidador),
    validadorCampos
    ],( req , res ) =>{ user.putUsuario( req, res ) });

//deshabilita usuarios por ID mongodb
router.delete('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    check('id').custom( idUsuarioValidador ),
    validadorCampos
    ],( req , res ) =>{ user.deleteUsuario( req, res ) });

module.exports = router;