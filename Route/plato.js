const { Router, response } = require('express');
const { check } = require('express-validator');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const { validadorCampos } = require('../middlewares/validadorCampos');
const { platoRepetidoValidador } = require('../helpers/validadorBD');
const router = Router();
const Plato = require('../Controller/plato');
const plato = new Plato();

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ plato.getAllPlato( req, res ) });

router.get('/:id',[
    check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ plato.getPlato( req, res ) });

router.post('/', upload.single('imagen'), [
    check('nombrePlato','El nombre del plato es requerido').not().isEmpty(),
    check('nombrePlato').custom(platoRepetidoValidador),
    validadorCampos
    ],( req , res ) =>{ plato.postPlato( req, res ) });

router.put('/:id',[
    check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ plato.putPlato( req, res ) });

router.delete('/:id',[
    check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ plato.deletePlato( req, res ) });

module.exports = router;