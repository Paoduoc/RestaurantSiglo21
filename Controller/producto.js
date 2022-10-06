const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const productoModel = require("../Model/producto");
//const { update } = require('../Model/rol');

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

            let {nombre, estado, cantidad, tipo} = req.body
            let producto = new productoModel({nombre, estado, cantidad, tipo})
            //const salt = bcryptjs.genSaltSync();
            //plato.contrasenna = bcryptjs.hashSync( contrasenna, salt );
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
            let {nombre} = req.body
            let plato = await platoModel.findByIdAndUpdate(id, {nombre});
            plato.nombre = nombre
            res.status(200).json({
                status:200,
                msg:plato
            })

        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el plato'
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