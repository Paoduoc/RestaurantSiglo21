const { Router, response } = require('express');
const { check } = require('express-validator');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const { validadorCampos } = require('../middlewares/validadorCampos');
const { menuRepetidoValidador } = require('../helpers/validadorBD');
const router = Router();
const Menu = require('../Controller/menu');
const menu = new Menu();

router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ menu.getAllMenu( req, res ) });

router.get('/:id',[
    check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ menu.getMenu( req, res ) });

router.post('/',[
    check('nombreMenu','El nombre del menu es requerido').not().isEmpty(),
    check('nombreMenu').custom(menuRepetidoValidador),
    validadorCampos
    ],( req , res ) =>{ menu.postMenu( req, res ) });

router.put('/:id',[
    check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ menu.putMenu( req, res ) });

router.delete('/:id',[
    check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ menu.deleteMenu( req, res ) });

module.exports = router;