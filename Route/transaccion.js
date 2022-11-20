const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Transaccion = require('../Controller/transaccion');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const transac = new Transaccion();

//Se añade el token a esta ruta
router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ transac.getAlltransaccion( req, res ) });

//se añade validacion de que el ID sea un mongoID
router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
],( req , res ) =>{ transac.gettransaccion( req, res ) });

//Se validan los campos requeridos*
router.post('/',[
    check('boleta','El ID de Boleta es requerido').not().isEmpty(),
    check('boleta','no es un id mongodb').isMongoId(),
    check('total','El total es requerido').not().isEmpty(),
    check('metodo','El total es requerido').not().isEmpty(),
    validadorCampos
],( req , res ) =>{ transac.posttransaccion( req, res ) });

router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
],( req , res ) =>{ transac.puttransaccion( req, res ) });


module.exports = router;