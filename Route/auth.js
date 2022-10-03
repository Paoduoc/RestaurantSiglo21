const { Router, response } = require('express');
const { check } = require('express-validator');
//const { roleValidator, emailValidator, idUserValidator} = require('../../helpers/dbValidator');
//const { validateFields } = require('../../middlewares/fields_middlewares');
const router = Router();

const Auth = require('../Controller/auth');
const auth = new Auth();

router.get('/register',( req , res ) =>{ auth.registerForm( req, res ) });

router.post('/register',( req , res ) =>{ auth.register( req, res ) });

router.get('/login',( req , res ) =>{ auth.loginForm( req, res ) });

router.post('/login',( req , res ) =>{ auth.login( req, res ) });


/* router.post('/google',[
    check('id_token','El id_token es obligatorio').not().isEmpty(),
    validateFields
    ],( req , res ) =>{ auth.googleSignIn( req, res ) 
}); */


module.exports = router;                               