const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Pedidos = require('../Controller/pedido');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const pedido = new Pedidos();

router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ pedido.getAllPedido( req, res ) });

router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ pedido.getPedido( req, res ) });


router.post('/',[
    //check('nombre','El nombre del rol es requerido').not().isEmpty(),
    validadorCampos
    ],( req , res ) =>{ pedido.postPedido( req, res ) });


router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ pedido.putPedido( req, res ) });

router.put('/devolucion/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ pedido.putDevolucion( req, res ) });

router.delete('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ pedido.deletePedido( req, res ) });

module.exports = router;