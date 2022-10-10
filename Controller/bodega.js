const { response, request } = require('express');
const bodegaModel = require("../Model/bodega");

class Bodega
{
    //Obtiene bodega segun mongoID
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
            let {nombreProducto, gramosDispo, gramosMin, gramosMax} = req.body
            let bodega = await bodegaModel.findByIdAndUpdate(id, {nombreProducto}, {gramosDispo}, {gramosMin}, {gramosMin});
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
    deleteBodega = async ( req=request, res=response ) => {
        
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
            let bodega = await bodegaModel.findByIdAndUpdate(id, update);
            bodega.estado = est
            res.status(200).json({
                status:200,
                msg:bodega
            })

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se elimino el producto en bodega'
            });
        }
    }
}

module.exports = Bodega;