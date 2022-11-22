const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const AccesoRol = require('../Controller/accesoRol');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const accesoRol = new AccesoRol();

router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ accesoRol.getAllAccesRol( req, res ) });

router.get('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
],( req , res ) =>{ accesoRol.getAccesRol( req, res ) });

router.post('/',[
    check('rol','El tipo de rol es obligatorio').not().isEmpty(),
    check('rol','El tipo de rol es obligatorio').isMongoId(),
    check('acceso','El tipo de acceso es obligatorio').not().isEmpty(),
    check('acceso','El tipo de acceso es obligatorio').isMongoId(),
    validadorCampos
],( req , res ) =>{ accesoRol.postAccesRol( req, res ) });

router.put('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
],( req , res ) =>{ accesoRol.putAcessRol( req, res ) });

router.delete('/:id',[
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
],( req , res ) =>{ accesoRol.deleteAccesRol( req, res ) });

module.exports = router;