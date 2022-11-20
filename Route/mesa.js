const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Mesa = require('../Controller/mesa');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const { mesaValidador } = require('../helpers/validadorBD');
const mesa = new Mesa();

router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ mesa.getAllmesas( req, res ) });

router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ mesa.getmesa( req, res ) });

router.post('/',[
    check('numMesa','El campo número de mesa es requerido').not().isEmpty(),
    check('numMesa').custom(mesaValidador),
    check('cantSillas','La cantidad de sillas es requerida').not().isEmpty(),
    validadorCampos
    ],( req , res ) =>{ mesa.postMesa( req, res ) });

router.put('/:numMesa',[
    check('numMesa','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ mesa.putMesa( req, res ) });

router.delete('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ mesa.deleteMesa( req, res ) });

module.exports = router;