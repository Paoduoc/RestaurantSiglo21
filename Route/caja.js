const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Caja = require('../Controller/caja');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const caja = new Caja();

//Se añade el token a esta ruta
router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ caja.getAlltransaccion( req, res ) });

//se añade validacion de que el ID sea un mongoID
router.get('/:id',( req , res ) =>{ caja.gettransaccion( req, res ) });

//Se validan los campos requeridos
router.post('/',( req , res ) =>{ caja.posttransaccion( req, res ) });

router.put('/:id',( req , res ) =>{ caja.puttransaccion( req, res ) });


module.exports = router;