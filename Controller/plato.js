const { response, request } = require('express');
const platoModel = require("../Model/plato");
const fs = require('fs');
const path = require('path');

class Plato
{
    getPlato = async ( req=request, res=response ) => {
        try {
            /* let {id} = req.params
            const plato = await platoModel.findById(id); */
            let {nombrePlato} = req.params
            const plato = await platoModel.findOne({nombrePlato:nombrePlato});
            res.status(200).json({
                status:200,
                msg:plato
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro el plato'
            });
        }
    }
    getAllPlato = async ( req=request, res=response ) => {
        
        try {
            const plato = await platoModel.find();
            res.status(200).json({
                status:200,
                msg:plato
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron platos'
            }); 
        }
    }
    postPlato = async ( req=request, res=response )=> {
        
        try {
            var obj = {
                nombrePlato: req.body.nombrePlato,
                estado: req.body.estado,
                categoria: req.body.categoria,
                ingredientes: req.body.ingredientes,
                preparacion: req.body.preparacion,
                tiempoPreparacion: req.body.tiempoPreparacion,
                precio: req.body.precio,
                imagen: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            }
            //let {nombrePlato, estado, categoria, ingredientes, preparacion, tiempoPreparacion, precio} = req.body
            //let {imagen} = req
            //let plato = new platoModel({nombrePlato, estado, categoria, ingredientes, preparacion, tiempoPreparacion, precio, 
            //    imagen})
            //await plato.save();
            platoModel.create(obj)
            res.status( 200 ).json({
                status: 201,
                msg: 'Plato creado'
            });

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadio el plato'
            });
        }
    }
    putPlato = async ( req=request, res=response ) => {
        
        try {
            let {nombrePlato} = req.params
            let {estado, ...update} = req.body
            let plato = await platoModel.findOneAndUpdate(nombrePlato, update);
            res.status(200).json({
                status:200,
                msg:"OK"
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
    deletePlato = async ( req=request, res=response ) => {
        
        try {
            let {nombrePlato} = req.params
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
            let plato = await platoModel.findOneAndUpdate(nombrePlato, update);
            plato.estado = est
            res.status(200).json({
                status:200,
                msg:plato
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se deshabilitó el plato'
            });
        }
    }
}

module.exports = Plato;