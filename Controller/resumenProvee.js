const { response, request } = require('express');
const resumenModel = require("../Model/resumenProvee");
const { formatoFecha } = require('../helpers/fecha');

class resumenCompraProvee
{
    getResumen = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const resumen = await resumenModel.findById(id)
            .populate({path:"resumenes.producto",select:"nombreProducto tipo"})
            .populate({path:"resumenes.proveedor",select:"nombreProvee ncontacto"});
            res.status(200).json({
                status:200,
                msg:resumen
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontró el resumen de compra a proveedor'
            });
        }
    }
    getAllResumen = async ( req=request, res=response ) => {
        
        try {
            const resumen = await resumenModel.find()
            .populate({path:"resumenes.producto",select:"nombreProducto tipo"})
            .populate({path:"resumenes.proveedor",select:"nombreProvee ncontacto"});
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
    getResumenFecha = async ( req=request, res=response ) => {
        try {
            let {fecha} = req.body
            const resumen = await resumenModel.find();
            let listaResumenes = resumen.filter( element => {
                let fechaI = element.fecha
                //console.log(fechaI.slice(0, 10));
                if (fechaI.slice(0, 10) == fecha) {
                    return element
                }
            });
            res.status(200).json({
                status:200,
                msg:listaResumenes
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron pedidos para esa fecha'
            }); 
        }
    }
    postResumen = async ( req=request, res=response ) => {
        
        try {
            let {resumenes, fecha, estado} = req.body
            let resumen = new resumenModel({resumenes, fecha, estado});
            
            await resumen.save();

            fecha = await formatoFecha(new Date());
            await resumenModel.findByIdAndUpdate(resumen.id, {fecha:fecha});

            await resumenModel.findByIdAndUpdate(resumen.id, {resumenes:resumenes});
            res.status( 200 ).json( {
                status: 201,
                msg: 'resumen de compra a proveedor creado'
            });
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadió resumen de compra a proveedor'
            });
        }
    
    }
    putResumen = async ( req=request, res=response ) => {
        
        try {

            let {id} = req.params
            let {resumenes} = req.body

            await resumenModel.findByIdAndUpdate(id, {resumenes:resumenes});

            res.status(200).json({
                status:200,
                msg:"OK"
            });
        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el resumen de compra a proveedor'
            });
        }
    }
    deleteResumen = async ( req=request, res=response ) => {
        
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
                est= false
            }
            let resumen = await resumenModel.findByIdAndUpdate(id, update);
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
                descripcion:'Ha ocurrido un error en el servidor, no se elimino el resumen de compra a proveedor'
            });
        }

    }

}

module.exports = resumenCompraProvee;