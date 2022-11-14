const { Router, response } = require('express');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validadorCampos');
const router = Router();
const Boleta = require('../Controller/boleta');
const boleta = new Boleta();

router.get('/',( req , res ) =>{ boleta.getAllBoletas( req, res ) });

router.get('/:id',( req , res ) =>{ boleta.getBoleta( req, res ) });

router.post('/',( req , res ) =>{ boleta.postBoleta( req, res ) });

router.put('/:id',( req , res ) =>{ boleta.putBoleta( req, res ) });


module.exports = router;