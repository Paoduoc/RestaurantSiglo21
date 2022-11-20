const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Acceso = require('../Controller/acceso');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const { rutaValidador } = require('../helpers/validadorBD');
const acceso = new Acceso();

//Se añade el token a esta ruta
router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ acceso.getAllAccesos( req, res ) });

//se añade validacion de que el ID sea un mongoID
router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ acceso.getAcceso( req, res ) });

//Se validan los campos requeridos
router.post('/',[
    check('ruta','El campo ruta es requerido').not().isEmpty(),
    check('ruta').custom(rutaValidador),
    validadorCampos
    ],( req , res ) =>{ acceso.postAcceso( req, res ) });

router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ acceso.putAcceso( req, res ) });

router.delete('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ acceso.deleteAcceso( req, res ) });

module.exports = router;