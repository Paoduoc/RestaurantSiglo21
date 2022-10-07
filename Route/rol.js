const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Roles = require('../Controller/rol');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const rol = new Roles();

router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ rol.getAllRol( req, res ) });

router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ rol.getRol( req, res ) });


router.post('/',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ rol.postRol( req, res ) });


router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ rol.putRol( req, res ) });


router.delete('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ rol.deleteRol( req, res ) });

module.exports = router;