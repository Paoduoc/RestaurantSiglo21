const { Router, response } = require('express');
const router = Router();
const Bodega = require('../Controller/bodega');
const bodega = new Bodega();

router.get('/:id',( req , res ) =>{ bodega.getBodega( req, res ) });
router.get('/',( req , res ) =>{ bodega.getAllBodega( req, res ) });
//router.post('/',( req , res ) =>{ bodega.postBodega( req, res ) });
router.put('/:id',( req , res ) =>{ bodega.putBodega( req, res ) });
//router.delete('/:id',( req , res ) =>{ bodega.deleteBodega( req, res ) });

module.exports = router;