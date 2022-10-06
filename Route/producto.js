const { Router, response } = require('express');
const { check } = require('express-validator');
const router = Router();
const Producto = require('../Controller/producto');
const producto = new Producto();

router.post('/',( req , res ) =>{ producto.postProducto( req, res ) });
router.get('/:id',( req , res ) =>{ producto.getProducto( req, res ) });
router.get('/',( req , res ) =>{ rol.getAllProducto( req, res ) });
router.put('/:id',( req , res ) =>{ producto.putProducto( req, res ) });
router.delete('/:id',( req , res ) =>{ producto.deleteProducto( req, res ) });

module.exports = router;

//no funcionan los routes al parecer