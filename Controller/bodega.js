const { response, request } = require('express');
const bodegaModel = require("../Model/bodega");
const productoModel = require("../Model/producto");
const proveeModel = require("../Model/proveedor");

class Bodega
{
    //decidir si se hara como array o no
    getBodega = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const bodega = await bodegaModel.find();
            let productoBodega
            let auxElemento = false
            bodega[0].productosBodega.forEach(element => {
                if (element.id == id){
                    productoBodega = element
                    auxElemento = true
                }
            });
            if (auxElemento){
                res.status( 200 ).json({
                    status: 201,
                    msg: productoBodega
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
                descripcion:'Ha ocurrido un error en el servidor, no se encontro el producto en bodega'
            }); 
        }
    }
    getAllBodega = async ( req=request, res=response ) => {
        
        try {
            const bodega = await bodegaModel.find();
            res.status(200).json({
                status:200,
                msg:bodega[0].productosBodega
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
    postBodega = async ( req=request, res=response ) => {
        
        try {

            let {productosBodega} = req.body
            let bodega = new bodegaModel({productosBodega})
            await bodega.save();
            res.status(200).json({ 
                status: 201,
                msg: 'Bodega creada' 
            });
            
        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadio la bodega'
            });
        }
    }
    putBodega = async ( req=request, res=response ) => {
        
        try {
            let {id} = req.params
            let {gramos, cantidadMin} = req.body

            const bodega = await bodegaModel.find();
            let auxElemento = false
            bodega[0].productosBodega.forEach(element => {
                if (element.id == id){
                    element.gramos = gramos;
                    element.cantidadMin = cantidadMin;
                    auxElemento = true;
                }
            });
            if(auxElemento){
                let aux = bodega[0].productosBodega;
                await bodegaModel.findByIdAndUpdate(bodega[0].id, {productosBodega:aux});
                res.status( 200 ).json({
                    status: 201,
                    msg: 'Producto en bodega modificado'
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
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el producto en bodega'
            });
        }
    }

    getBajoProducto = async ( req=request, res=response ) => {
        
        try {
            const bodega = await bodegaModel.find();
            let productosBajo = bodega[0].productosBodega.filter(element => {
                if (element.gramos <= element.cantidadMin){
                    return element;
                }
            });
            res.status( 200 ).json({
                status: 201,
                msg: productosBajo
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion: 'Ha ocurrido un error en el servidor, no se encontraron productos con esa condición'
            });
        }
    }

    //traera proveedores que tengan los tipos de producto del producto que se pasara por el ID
    getProveedorProducto = async ( req=request, res=response ) => {
        
        try {
            //el id se lo tiene que pasar el front a este get en base al get de arriba
            let {id} = req.params
            const producto = await productoModel.findById(id);
            const provee = await proveeModel.findOne({tipoProd:producto.tipo});
            if (provee!=null) {
                res.status( 200 ).json({
                    status: 201,
                    msg: provee
                });
            } else {
                res.status( 404 ).json({
                    status: 404,
                    Error: 'No se encontraron proveedores para ese producto'
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion: 'Ha ocurrido un error en el servidor, no se encontraron proveedores para este producto'
            });
        }
    }
}

module.exports = Bodega;