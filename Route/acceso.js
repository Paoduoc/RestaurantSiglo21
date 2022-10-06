const { Router, response } = require('express');
const router = Router();
const Rol = require('../Controller/rol');
const rol = new Rol();

router.post('/',( req , res ) =>{ rol.postRol( req, res ) });
router.get('/:id',( req , res ) =>{ rol.getRol( req, res ) });
router.get('/',( req , res ) =>{ rol.getAllRol( req, res ) });
router.put('/:id',( req , res ) =>{ rol.putRol( req, res ) });
router.delete('/:id',( req , res ) =>{ rol.deleteRol( req, res ) });

module.exports = router;