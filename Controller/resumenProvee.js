const { response, request } = require('express');
const resumenProvee = require("../Model/resumenProvee");

class resumenCompraProvee
{
    getResumen = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const resumen = await resumenProvee.findById(id)
            .populate({path:"proveedor",select:"nombreProvee ncontacto correo direccion"})
            .populate({path:"producto",select:"nombreProducto tipo"});
            res.status(200).json({
                status:200,
                msg:resumen
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontró el resúmen de compra a proveedor'
            }); 
        }

    }
    getAllResumen = async ( req=request, res=response ) => {
        
        try {
            const resumen = await resumenProvee.find()
            //no funcan el primer populate
            .populate({path:"proveedor",select:"nombreProvee ncontacto correo direccion"})
            .populate({path:"producto",select:"nombreProducto tipo"});
            //.populate({path:"producto",select:"tipo"});
            res.status(200).json({
                status:200,
                msg:resumen
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron resúmenes de compra a proveedor'
            }); 
        }

    }
    postResumen = async ( req=request, res=response ) => {
        
        try {
            let {proveedor, estado, producto, gramos} = req.body
            let resumen = new resumenProvee({proveedor, estado, producto, gramos})

            await resumen.save();
            res.status( 200 ).json( { 
                status: 201,
                msg: 'Resúmen de compra a proveedor creado' 
            });
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadió resúmen de compra a proveedor'
            });
        }
    
    }
    putResumen = async ( req=request, res=response ) => {
        
        try {

            let {id} = req.params
            let {estado, ...update} = req.body
            let resumen = await resumenProvee.findByIdAndUpdate(id, ...update);
            res.status(200).json({
                status:200,
                msg:resumen
            })
            //Se envia msg acceso solo para ver el que el acceso haya cambiado realmente, evidencias para BACK

        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el resúmen de compra a proveedor'
            });

        }

    }
    deleteResumen = async ( req=request, res=response ) => {
        
        try {
            
            let {id} = req.params
            let update = {}
            let est
            let {estado = false} = req.query
            //Se realiza validación si es que se requiere volver a habilitar 
            if (estado == "true") {
                update = {estado:true}
                est = true
            } else {
                update = {estado:false}
                est= false
            }
            let resumen = await resumenProvee.findByIdAndUpdate(id, update);
            resumen.estado = est
            res.status(200).json({
                status:200,
                msg:estado
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se elimino el resúmen de compra a proveedor'
            });
        }

    }

}

module.exports = resumenCompraProvee;