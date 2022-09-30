const { Router, response } = require('express');
const { check } = require('express-validator');
const router = Router();
const Rol = require('../Controller/rol');
const rol = new Rol();

router.post('/',( req , res ) =>{ rol.login( req, res ) });
router.get('/',( req , res ) =>{ rol.login( req, res ) });
router.put('/',( req , res ) =>{ rol.login( req, res ) });
router.delete('/',( req , res ) =>{ rol.login( req, res ) });

module.exports = router;