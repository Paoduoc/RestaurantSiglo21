const { Router, response } = require('express');
const { check } = require('express-validator');
const router = Router();
const Plato = require('../Controller/plato');
const plato = new Plato();

router.post('/',( req , res ) =>{ plato.postPlato( req, res ) });
router.get('/:id',( req , res ) =>{ plato.getPlato( req, res ) });
router.get('/',( req , res ) =>{ plato.getAllPlato( req, res ) });
router.put('/:id',( req , res ) =>{ plato.putPlato( req, res ) });
router.delete('/:id',( req , res ) =>{ plato.deletePlato( req, res ) });

module.exports = router;