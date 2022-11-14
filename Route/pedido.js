const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Pedidos = require('../Controller/pedido');
const { garzonValidador } = require('../helpers/validadorBD');
const pedido = new Pedidos();

router.get('/',( req , res ) =>{ pedido.getAllPedido( req, res ) });

router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ pedido.getPedido( req, res ) });

router.post('/',[
    check('garzon','El garzón es requerido').not().isEmpty(),
    check('reserva','La mesa es requerida').not().isEmpty(),
    check('platosID','Los platos son requeridos').not().isEmpty(),
    check('garzon').custom(garzonValidador),
    validadorCampos
    ],( req , res ) =>{ pedido.postPedido( req, res ) });


router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ pedido.putPedido( req, res ) });

router.put('/termino/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ pedido.putPedidoTerminado( req, res ) });

module.exports = router;