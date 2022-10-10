const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const router = Router();
const Bodega = require('../Controller/bodega');
const bodega = new Bodega();

router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ bodega.getAllBodega( req, res ) });

router.get('/:id',[
    check('id', 'No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ bodega.getBodega( req, res ) });

router.put('/:id',[
    check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ bodega.putBodega( req, res ) });

router.delete('/:id',[
    check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ bodega.deleteBodega( req, res ) });

module.exports = router;