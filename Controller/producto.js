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
            let auxElemento = false;

            //traer id
            const bodega = await bodegaModel.find();
            
            bodega[0].productosBodega.forEach(element => {
                if (element.nombreProducto == update.nombreProducto){
                    res.status(500).json({
                        status:500,
                        msg:'Duplicidad producto',
                        descripcion:'El nombre del producto ya existe'
                    });
                } else{
                    auxElemento = true;
                }
            });
            if(auxElemento){
            let aux = bodega[0].productosBodega;
            aux.push(update);

            await bodegaModel.findByIdAndUpdate(bodega[0].id, {productosBodega:aux});
            await producto.save();

            res.status( 200 ).json({
                status: 201,
                msg: 'Producto creado'
            });
            }
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
            let {tipo, cantidadMin} = req.body

            //producto
            await productoModel.findOneAndUpdate(nombreProducto, {tipo:tipo});

            //bodega
            //traer nombre prod-bodega
            const bodega = await bodegaModel.find();
            console.log(nombreProducto);
            let auxElemento = false
            bodega[0].productosBodega.forEach(element => {
                if (element.nombreProducto == nombreProducto){
                    element.cantidadMin = cantidadMin;
                    console.log(cantidadMin);
                    auxElemento = true;
                }
            });
            if(auxElemento){
                let aux = bodega[0].productosBodega;
                await bodegaModel.findByIdAndUpdate(bodega[0].id, {productosBodega:aux});
                res.status( 200 ).json({
                    status: 201,
                    msg: 'Producto modificado'
                });
            } else {
                res.status(500).json({
                    status:500,
                    msg:'Producto no existente',
                    descripcion:'El producto no existe'
                });
            }
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
            let {nombreProducto} = req.params;
            let {estado} = req.query;
            let update = estado=='true'?true:false;

            await productoModel.findOneAndUpdate({nombreProducto:nombreProducto}, {estado:update});
            const bodega = await bodegaModel.find();

            let auxElemento = false
            bodega[0].productosBodega.forEach(element => {
                if (element.nombreProducto == nombreProducto){
                    element.estado = update;
                    auxElemento = true;
                }
            });
            if(auxElemento){
                let aux = bodega[0].productosBodega;
                await bodegaModel.findByIdAndUpdate(bodega[0].id, {productosBodega:aux});
                res.status( 200 ).json({
                    status: 201,
                    msg: update?'Producto habilitado':'Producto deshabilitado'
                });
            } else {
            res.status(500).json({
                status:500,
                msg:'Producto no existente',
                descripcion:'El producto no existe'
            });
            }
        }
        catch (error) {
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