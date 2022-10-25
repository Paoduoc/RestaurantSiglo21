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
const cors = require('cors');
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
//router.use("/images", express.static('images'));
router.use(cors({
    origin: 'http://localhost:8080'
}));

//
//router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ plato.getAllPlato( req, res ) });

router.get('/:nombrePlato', [validadorCampos],( req , res ) =>{ plato.getReceta( req, res ) });

router.post('/recetas', upload.single('imagen'), ( req , res ) =>{ plato.postReceta( req, res ) });

router.post('/', ( req , res ) =>{ plato.postPlato( req, res ) });

router.put('/:nombrePlato', upload.single('imagen'), ( req , res ) =>{ plato.putReceta( req, res ) });

router.delete('/:nombrePlato',( req , res ) =>{ plato.deleteReceta( req, res ) });

router.use("/images", express.static('images'));

module.exports = router;