const { Router, response } = require('express');
const router = Router();
const Producto = require('../Controller/producto');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const producto = new Producto();

router.use(validaAccesoToken)



router.get('/:id',( req , res ) =>{ producto.getProducto( req, res ) });
router.get('/',( req , res ) =>{ producto.getAllProducto( req, res ) });
router.post('/',( req , res ) =>{ producto.postProducto( req, res ) });
router.put('/:id',( req , res ) =>{ producto.putProducto( req, res ) });
router.delete('/:id',( req , res ) =>{ producto.deleteProducto( req, res ) });

module.exports = router;