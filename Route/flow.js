const { Router } = require('express');
const { check } = require('express-validator');
const Flow = require('../Controller/flow');
const { secretValidador, idServiceMovValidador } = require('../helpers/validadorBD');
const { validadorCampos } = require('../middlewares/validadorCampos');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const flow = new Flow();
const router = Router();


router.post('/crear/:id', [ 
    validaAccesoToken,
    check('id','no es un id mongodb').isMongoId(),
    check('id').custom(idServiceMovValidador),
    validadorCampos
],( req , res ) => { flow.postFlow( req, res ) });

router.get('/estatus/' ,( req , res ) => { flow.getFlow( req, res ) });

router.post('/estatus/:secret', [ 
    check('secret').custom(secretValidador),
    validadorCampos 
] ,( req , res ) => { flow.putFlow( req, res ) });

module.exports = router;