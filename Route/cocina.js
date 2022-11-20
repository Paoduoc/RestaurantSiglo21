const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Cocina = require('../Controller/cocina');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const cocina = new Cocina();

//Se añade el token a esta ruta
router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ cocina.getAllComandas( req, res ) });

//se añade validacion de que el ID sea un mongoID
router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ cocina.getComanda( req, res ) });

//Se validan los campos requeridos
router.post('/',[
    validadorCampos
    ],( req , res ) =>{ cocina.postComanda( req, res ) });

router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ cocina.putComanda( req, res ) });

router.delete('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ cocina.deleteComanda( req, res ) });

module.exports = router;