const { response, request } = require('express');
const bodegaModel = require("../Model/bodega");

class Bodega
{
    //decidir si se hara como array o no
    getBodega = async ( req=request, res=response ) => {

        try {
            let {nombreProducto} = req.params
            const bodega = await bodegaModel.find();
            let auxElemento = false
            let productoBodega
            bodega[0].productosBodega.forEach(element => {
                if (element.nombreProducto == nombreProducto){
                    productoBodega = element
                    auxElemento = true;
                }
            });
            if(auxElemento){
                res.status(200).json({
                    status:200,
                    msg:productoBodega
                })
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
            //en bodega solo se puede editar la cantidad y cantidadmin
            let {nombreProducto} = req.params
            let {...update} = req.body

            //traer nombre prod-bodega
            const bodega = await bodegaModel.find();
            console.log(bodega);
            let auxElemento = false
            bodega[0].productosBodega.forEach(element => {
                console.log(element);
                if (element.nombreProducto == nombreProducto){
                    element.gramos = update.gramos;
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
}

module.exports = Bodega;