const { response, request } = require('express');
const productoModel = require("../Model/producto");
const bodegaModel = require("../Model/bodega");

class Producto
{
    getProducto = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const producto = await productoModel.findOne({id});
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
            //let {tipo, ...update} = req.body
            let {nombreProducto, estado, tipo, gramos, cantidadMin} = req.body
            let producto = new productoModel({nombreProducto, estado, tipo})
            let id = producto.id

            const bodega = await bodegaModel.find();
            let aux = bodega[0].productosBodega;

            aux.push({id, nombreProducto, estado, gramos, cantidadMin});
            await producto.save();
            await bodegaModel.findByIdAndUpdate(bodega[0].id, ({productosBodega:aux})); 

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
            let {nombreProducto, tipo} = req.body
            
            let producto = await productoModel.findByIdAndUpdate(id, {nombreProducto, tipo});
            const bodega = await bodegaModel.find();
            let auxElemento = false
            bodega[0].productosBodega.forEach(element => {
                if (element.id == id){
                    element.nombreProducto = nombreProducto;
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
            let {id} = req.params;
            let {estado} = req.query;
            let update = estado=='true'?true:false;

            const bodega = await bodegaModel.find();

            let auxElemento = false
            bodega[0].productosBodega.forEach(element => {
                if (element.id == id){
                    element.estado = update;
                    auxElemento = true;
                }
            });
            if(auxElemento){
                let aux = bodega[0].productosBodega;
                await bodegaModel.findByIdAndUpdate(bodega[0].id, {productosBodega:aux});
                await productoModel.findByIdAndUpdate(id, {estado:update});
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