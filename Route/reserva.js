const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Reserva = require('../Controller/reservas');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const { reservaValidador, sobrecupoValidador } = require('../helpers/validadorBD');
const reserva = new Reserva();

router.use(validaAccesoToken)

router.get('/',[

    validadorCampos
    ],( req , res ) =>{ reserva.getAllReserva( req, res ) });

router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ reserva.getReserva( req, res ) });

router.post('/',[
    check('mesa','El número de mesa es requerido').not().isEmpty(),
    check('mesa').custom( reservaValidador ),
    validadorCampos
    ],( req , res ) =>{ reserva.postReserva( req, res ) });

router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ reserva.putReserva( req, res ) });

router.put('/sobrecupo/:id',[
    check('id','no es un id mongodb').isMongoId(),
    //check('id').custom(sobrecupoValidador),
    validadorCampos
    ],( req , res ) =>{ reserva.putSobrecupo( req, res ) });
module.exports = router;