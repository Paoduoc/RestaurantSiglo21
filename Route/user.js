const { Router, response } = require('express');
const { check } = require('express-validator');
const router = Router();
const User = require('../Controller/user');
const user = new User();

router.get('/:id',( req , res ) =>{ user.getUsuario( req, res ) });
router.get('/',( req , res ) =>{ user.getAllUsuario( req, res ) });
router.post('/',( req , res ) =>{ user.postUsuario( req, res ) });
router.put('/:id',( req , res ) =>{ user.putUsuario( req, res ) });
router.delete('/:id',( req , res ) =>{ user.deleteUsuario( req, res ) });

module.exports = router;