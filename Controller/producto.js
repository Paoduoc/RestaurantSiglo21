const { response, request } = require('express');
const productoModel = require("../Model/producto");
const bodegaModel = require("../Model/bodega");
const bodegaCocinaModel = require("../Model/bodegacocina");

class Producto
{
    
    getProducto = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const producto = await productoModel.findById(id);
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

            let {nombreProducto, estado, tipo, gramosDispo, gramosMin, gramosMax} = req.body
            let producto = new productoModel({nombreProducto, estado, tipo})
            //vamos a trabajar en gramos en vez de cantidad, por lo que se debe modificar
            //deberia ser un form que traiga: nombre, estado, tipo, gramosDispo, gramosMin, gramosMax
            let bodega = new bodegaModel({nombreProducto, gramosDispo, gramosMin, gramosMax})
            let bodegacocina = new bodegaCocinaModel({nombreProducto, gramosMin, gramosMax})
            await producto.save();
            await bodega.save();
            await bodegacocina.save();
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
            let {estado, gramosDispo, ...update} = req.body
            // los tres puntos es para desestructurar los datos
            let producto = await productoModel.findByIdAndUpdate(id, update);
            let bodega = await bodegaModel.findByIdAndUpdate(id, update);
            let bodegacocina = await bodegaCocinaModel.findByIdAndUpdate(id, update);
            res.status(200).json({
                status:200,
                msg:producto, bodega, bodegacocina
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
    }
}

module.exports = Producto;