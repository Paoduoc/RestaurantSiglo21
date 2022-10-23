const { Router, response } = require('express');
const { check } = require('express-validator');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const { validadorCampos } = require('../middlewares/validadorCampos');
const { platoRepetidoValidador } = require('../helpers/validadorBD');
const router = Router();
const Plato = require('../Controller/plato');
const plato = new Plato();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ plato.getAllPlato( req, res ) });

router.get('/:nombrePlato', [validadorCampos],( req , res ) =>{ plato.getReceta( req, res ) });

router.post('/recetas', upload.single('imagen'), ( req , res ) =>{ plato.postReceta( req, res ) });

router.post('/', ( req , res ) =>{ plato.postPlato( req, res ) });

router.put('/:id',[
    check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ plato.putPlato( req, res ) });

router.delete('/:id',[
    check('id','No es un id mongoDB').isMongoId(),
    validadorCampos
    ],( req , res ) =>{ plato.deletePlato( req, res ) });

module.exports = router;