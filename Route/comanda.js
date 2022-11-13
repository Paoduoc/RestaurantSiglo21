const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const router = Router();
const Comanda = require('../Controller/comanda');
const comanda = new Comanda();

router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ comanda.getAllComandas( req, res ) });+

router.get('/:id',[validadorCampos],( req , res ) =>{ comanda.getComanda( req, res ) });

router.put('/:id',[
    //check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ comanda.putComanda( req, res ) });

router.delete('/:id',[
    check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ bodega.deleteBodega( req, res ) });

router.get('/bajos',( req , res ) =>{ bodega.getBajoProducto( req, res ) });

router.get('/bajos/provee/:id',( req , res ) =>{ bodega.getProveedorProducto( req, res ) });


module.exports = router;