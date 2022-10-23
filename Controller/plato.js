const { response, request } = require('express');
const platoModel = require("../Model/plato");
const fs = require('fs');
const path = require('path');

class Plato
{   
    postPlato = async ( req=request, res=response )=> {
        
        try {
            let {recetas} = req.body
            let plato = new platoModel(recetas)
            await plato.save();
            res.status( 200 ).json({
                status: 201,
                msg: 'Plato creado'
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

    getReceta = async ( req=request, res=response ) => {
        try {
            let {nombrePlato} = req.params
            const plato = await platoModel.find();
            let auxElemento = false
            let recetas
            plato[0].recetas.forEach(element => {
                if (element.nombrePlato == nombrePlato){
                    recetas = element
                    auxElemento = true;
                }
            });
            if(auxElemento){
                res.status(200).json({
                    status:200,
                    msg:recetas
                })
            } else {
                res.status(500).json({
                    status:500,
                    msg:'Receta no existente',
                    descripcion:'La receta no existe'
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro la receta'
            }); 
        }
    }
    getAllPlato = async ( req=request, res=response ) => {
        
        try {
            const plato = await platoModel.find();
            res.status(200).json({
                status:200,
                msg:plato[0].recetas
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron recetas'
            }); 
        }
    }

    //revisar
    postReceta = async ( req=request, res=response )=> {
        
        try {
            var obj = {
                imagen: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            }
            console.log(obj);
            let update = req.body
            let imagen = {
                data: req.file.filename,
                contentType: 'image/png'
            }
            let auxElemento = false;

            const plato = await platoModel.find();
            plato[0].recetas.forEach(element => {
                if (element.nombrePlato == update.nombrePlato){
                    res.status(500).json({
                        status:500,
                        msg:'Duplicidad plato',
                        descripcion:'El nombre del plato ya existe'
                    });
                } else{
                    auxElemento = true;
                }
            });
            if(auxElemento){
                let aux = plato[0].recetas;
                aux.push({...update, imagen});

                await platoModel.findByIdAndUpdate(plato[0].id, {recetas:aux});

                res.status( 200 ).json({
                    status: 201,
                    msg: 'Plato creado'
                });
            }

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