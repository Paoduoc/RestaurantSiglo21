const { Router, response } = require('express');
const router = Router();
const BodegaCocina = require('../Controller/bodegaCocina');
const bodegaCocina = new BodegaCocina();

router.get('/:id',( req , res ) =>{ bodegaCocina.getBodegaCocina( req, res ) });
router.get('/',( req , res ) =>{ bodegaCocina.getAllBodegaCocina( req, res ) });
//router.post('/',( req , res ) =>{ bodegaCocina.postBodegaCocina( req, res ) });
router.put('/:id',( req , res ) =>{ bodegaCocina.putBodegaCocina( req, res ) });
//router.delete('/:id',( req , res ) =>{ bodegaCocina.deleteBodegaCocina( req, res ) });

module.exports = router;