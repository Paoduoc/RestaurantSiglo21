const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Reserva = require('../Controller/reservas');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const { mesaValidador } = require('../helpers/validadorBD');
const reserva = new Reserva();

router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ reserva.getAllReserva( req, res ) });

router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ reserva.getReserva( req, res ) });

router.post('/',[
    validadorCampos
    ],( req , res ) =>{ reserva.postReserva( req, res ) });

//esta mal que vaya con mongo id, es decir, en los post esta validacion no va

router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ reserva.putReserva( req, res ) });

/* router.delete('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ reserva.delete( req, res ) }); */

module.exports = router;