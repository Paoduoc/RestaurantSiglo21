const { Router, response } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validadorCampos } = require('../middlewares/validadorCampos');
const Auth = require('../Controller/auth');
const auth = new Auth();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('contrasenna','La contraseña en obligatoria').not().isEmpty(),
    validadorCampos
],( req , res ) =>{ auth.login( req, res ) });

module.exports = router;                               