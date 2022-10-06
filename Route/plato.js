const { Router, response } = require('express');
const { check } = require('express-validator');
const router = Router();
const Plato = require('../Controller/plato');
const plato = new Plato();

router.post('/',( req , res ) =>{ rol.postPlato( req, res ) });
router.get('/:id',( req , res ) =>{ rol.getPlato( req, res ) });
router.get('/',( req , res ) =>{ rol.getAllPlato( req, res ) });
router.put('/:id',( req , res ) =>{ rol.putPlato( req, res ) });
router.delete('/:id',( req , res ) =>{ rol.deletePlato( req, res ) });

module.exports = router;