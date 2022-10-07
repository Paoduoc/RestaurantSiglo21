const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Acceso = require('../Controller/acceso');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const acceso = new Acceso();

router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ acceso.getAllAccesos( req, res ) });

router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ acceso.getAcceso( req, res ) });

router.post('/',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ acceso.postAcceso( req, res ) });

router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ acceso.putAcceso( req, res ) });

router.delete('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ acceso.deleteAcceso( req, res ) });

module.exports = router;