const { response, request } = require('express');
const productoModel = require("../Model/producto");
const bodegaModel = require("../Model/bodega");
const bodega = require('../Model/bodega');

class Producto
{
    
    getProducto = async ( req=request, res=response ) => {

        try {
            let {nombreProducto} = req.params
            const producto = await productoModel.findOne({nombreProducto:nombreProducto});
            res.status(200).json({
                status:200,
                msg:producto
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro el producto'
            }); 
        }
    }
    getAllProducto = async ( req=request, res=response ) => {
        
        try {
            const productos = await productoModel.find();
            res.status(200).json({
                status:200,
                msg:productos
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron productos'
            }); 
        }

    }
    postProducto = async ( req=request, res=response ) => {
        
        try {

            let {tipo, ...update} = req.body
            let producto = new productoModel({tipo, ...update})

            let id = '6350a1994ad665993500c5e9'
            let bodegaId = await bodegaModel.findById(id)
            let aux = []
            bodegaId.productosBodega.forEach(element => {
                aux.push(element)
            });
            aux.push(update)
            await bodegaModel.findByIdAndUpdate(id, {productosBodega:aux});

            await producto.save();
            res.status( 200 ).json({
                status: 201,
                msg: 'Producto creado'
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadio el producto'
            });
        }
    }
    putProducto = async ( req=request, res=response ) => {
        
        try {
            let {id} = req.params
            let {...update} = req.body
            let bodegaId = await bodegaModel.findById(id)
            let aux = []
            bodegaId.productosBodega.forEach(element => {
                aux.push(element)
            });
            aux.push(update)
            console.log(aux)
            await bodegaModel.findByIdAndUpdate(id, {productosBodega:aux});
            res.status(200).json({
                status:200,
                msg:"OK"
            })

        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el producto'
            });

        }

    }
    deleteProducto = async ( req=request, res=response ) => {
        //este delete deberia ser en cada modelo, esto porque el id de productos y el de bodega opr ej, son diferentes
        //asi que no se puede hacer en la misma request el delete para los 3 (bodega, bcocina y prod)
        try {
            let {nombreProducto} = req.params
            let update = {}
            let est
            let {estado = false} = req.query
            if (estado == "true") {
                update = {estado:true}
                est = true
            } else {
                update = {estado:false}
                est = false
            }
            let producto = await productoModel.findOneAndUpdate(nombreProducto, update);
            let productoBodega = await bodegaModel.findOneAndUpdate(nombreProducto, update);
            producto.estado = est
            productoBodega.estado = est
            res.status(200).json({
                status:200,
                msg:"OK"
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se deshabilitó el producto'
            });
        }
    }
}

module.exports = Producto;