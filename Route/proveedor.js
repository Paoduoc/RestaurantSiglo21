const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Proveedor = require('../Controller/proveedor');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const proveedor = new Proveedor();

//Se añade el token a esta ruta
router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ proveedor.getAllProv( req, res ) });

//se añade validacion de que el ID sea un mongoID
router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ proveedor.getProv( req, res ) });

//Se validan los campos requeridos
router.post('/',[
    check('nombreProvee','El campo nombre proveedor es requerido').not().isEmpty(),
    check('ncontacto','El campo número de contacto es requerido').not().isEmpty(),
    check('tipoProd','El campo tipo de producto es requerido').not().isEmpty(),
    validadorCampos
    ],( req , res ) =>{ proveedor.postProv( req, res ) });

router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ proveedor.putProv( req, res ) });

router.delete('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ proveedor.deleteProv( req, res ) });

module.exports = router;