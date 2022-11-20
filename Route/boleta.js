const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Boleta = require('../Controller/boleta');
const boleta = new Boleta();

router.get('/',[
    check('fechaB','La fecha es requerida').not().isEmpty(),
    validadorCampos
],( req , res ) =>{ boleta.getAllBoletas( req, res ) });

router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
],( req , res ) =>{ boleta.getBoleta( req, res ) });

router.post('/',[
    check('pedidoID','El ID del pedido es requerido').not().isEmpty(),
    check('pedidoID','no es un id mongodb').isMongoId(),
    validadorCampos
],( req , res ) =>{ boleta.postBoleta( req, res ) });

router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
],( req , res ) =>{ boleta.putBoleta( req, res ) });


module.exports = router;