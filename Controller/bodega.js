const { response, request } = require('express');
const bodegaModel = require("../Model/bodega");

class Bodega
{
    
    getBodega = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const bodega = await bodegaModel.findById(id);
            res.status(200).json({
                status:200,
                msg:bodega
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro el producto en bodega'
            }); 
        }
    }
    getAllBodega = async ( req=request, res=response ) => {
        
        try {
            const bodega = await bodegaModel.find();
            res.status(200).json({
                status:200,
                msg:bodega
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron productos en bodega'
            }); 
        }
    }
    /* postProducto = async ( req=request, res=response ) => {
        
        try {

            let {nombre, estado, cantidad, tipo} = req.body
            let producto = new productoModel({nombre, estado, cantidad, tipo})
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
    } */
    putBodega = async ( req=request, res=response ) => {
        
        try {
            let {id} = req.params
            let {gramosDispo, ...update} = req.body
            //se especifica el campo que NO quieres editar y al lado update ](que tomara todos los demas campos que enviees)
            let bodega = await bodegaModel.findByIdAndUpdate(id, update);
            //producto.nombre = nombre
            //producto.cantidad = cantidad
            //producto.tipo = tipo
            //es soloo setear el cambio para que lo muestre en el msg (es solo visual)
            res.status(200).json({
                status:200,
                msg: "OK"
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el producto en bodega'
            });
        }
    }
    /* deleteProducto = async ( req=request, res=response ) => {
        
        try {
            let {id} = req.params
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
            let producto = await productoModel.findByIdAndUpdate(id, update);
            producto.estado = est
            res.status(200).json({
                status:200,
                msg:producto
            })

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se elimino el producto'
            });
        }
    } */
}

module.exports = Bodega;