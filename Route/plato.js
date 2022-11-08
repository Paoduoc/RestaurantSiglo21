const { Router, response } = require('express');
const { check } = require('express-validator');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const { validadorCampos } = require('../middlewares/validadorCampos');
const { platoRepetidoValidador } = require('../helpers/validadorBD');
const router = Router();
const Plato = require('../Controller/plato');
const plato = new Plato();

//
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const express = require('express');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

router.get('/',( req , res ) =>{ plato.getAllPlato( req, res ) });

router.get('/:id', [
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ plato.getPlato( req, res ) });

router.post('/', upload.single('imagen'), [
    check('nombrePlato','El campo nombre de plato es requerido').not().isEmpty(),
    check('nombrePlato').custom(platoRepetidoValidador),
    validadorCampos
    ], ( req , res ) =>{ plato.postPlato( req, res ) });

router.put('/:id', upload.single('imagen'), [
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ], ( req , res ) =>{ plato.putPlato( req, res ) });

router.delete('/:id', [
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ], ( req , res ) =>{ plato.deletePlato( req, res ) });

router.use("/images", express.static('images'));

module.exports = router;