const { response, request } = require('express');
const bodegaCocinaModel = require("../Model/bodegacocina");

class BodegaCocina
{
    
    getBodegaCocina = async ( req=request, res=response ) => {
        try {
            let {id} = req.params
            const bodegaCocina = await bodegaCocinaModel.findById(id);
            res.status(200).json({
                status:200,
                msg:bodegaCocina
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro el producto en la bodega de cocina'
            }); 
        }
    }
    getAllBodegaCocina = async ( req=request, res=response ) => {
        
        try {

            const bodegaCocina = await productoModel.find();
            res.status(200).json({
                status:200,
                msg:bodegaCocina
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron productos en la bodega de cocina'
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
    putBodegaCocina = async ( req=request, res=response ) => {
        
        try {

            let {id} = req.params
            let {gramosDispo, gramosMin, gramosMax} = req.body
            let bodegaCocina = await bodegaCocinaModel.findByIdAndUpdate(id, {gramosDispo}, {gramosMin}, {gramosMax});
            res.status(200).json({
                status:200,
                msg:bodegaCocina
            })

        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el producto en la bodega de cocina'
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

module.exports = BodegaCocina;