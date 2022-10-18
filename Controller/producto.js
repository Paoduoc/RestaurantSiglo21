const { response, request } = require('express');
const productoModel = require("../Model/producto");
const bodegaModel = require("../Model/bodega");

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

            let {nombreProducto, estado, tipo, cantidad, cantidadMin} = req.body
            let producto = new productoModel({nombreProducto, estado, tipo})
            let bodega = new bodegaModel({nombreProducto, cantidad, cantidadMin})
            await producto.save();
            await bodega.save();
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

            let {nombreProducto} = req.params
            let {estado, gramosDispo, ...update} = req.body
            // los tres puntos es para desestructurar los datos
            await productoModel.findOneAndUpdate(nombreProducto, update);
            await bodegaModel.findOneAndUpdate(nombreProducto, update);
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