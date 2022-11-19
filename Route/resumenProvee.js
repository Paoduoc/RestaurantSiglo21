const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const ResumenProvee = require('../Controller/resumenProvee');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const resumen = new ResumenProvee();

//Se añade el token a esta ruta
router.use(validaAccesoToken)

//se añade validacion de que el ID sea un mongoID
router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ resumen.getResumen( req, res ) });

router.get('/',( req , res ) =>{ resumen.getAllResumen( req, res ) });

//Se validan los campos requeridos
router.post('/',[
    check('gramos','El campo de cantidad de gramos es requerido').not().isEmpty(),
    validadorCampos
    ],( req , res ) =>{ resumen.postResumen( req, res ) });

router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ resumen.putResumen( req, res ) });

router.delete('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ resumen.deleteResumen( req, res ) });

module.exports = router;