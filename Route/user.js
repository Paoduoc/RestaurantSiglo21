const { Router, response } = require('express');
const { check } = require('express-validator');
//const { roleValidator, emailValidator, idUserValidator} = require('../../helpers/dbValidator');
//const { validateFields } = require('../../middlewares/fields_middlewares');
const router = Router();
const User = require('../Controller/user');
const user = new User();

router.post('/',( req , res ) =>{ auth.login( req, res ) });
router.get('/',( req , res ) =>{ user.getAllUsuario( req, res ) });
router.put('/',( req , res ) =>{ auth.login( req, res ) });
router.delete('/',( req , res ) =>{ auth.login( req, res ) });

module.exports = router;