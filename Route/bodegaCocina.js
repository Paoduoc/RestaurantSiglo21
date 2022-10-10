const { Router, response } = require('express');
const { check } = require('express-validator');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const BodegaCocina = require('../Controller/bodegaCocina');
const bodegaCocina = new BodegaCocina();

router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ bodegaCocina.getAllBodegaCocina( req, res ) });

router.get('/:id',[
    check('id', 'No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ bodegaCocina.getBodegaCocina( req, res ) });

router.put('/:id',[
    check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ bodegaCocina.putBodegaCocina( req, res ) });

router.delete('/:id',[
    check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ bodegaCocina.deleteBodegaCocina( req, res ) });

module.exports = router;