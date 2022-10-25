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
            let update = req.body
            let imagen = {
                data: req.file.filename,
                contentType: 'image/png'
            }
            let auxElemento = false;

            const plato = await platoModel.find();
            console.log("SAdasdsa")
            plato[0].recetas.forEach(element => {
                if (element.nombrePlato == update.nombrePlato){
                    res.status(500).json({
                        status:500,
                        msg:'Duplicidad plato',
                        descripcion:'El nombre del plato ya existe'
                    });
                } else{
                    auxElemento = true;
                    console.log("aasadasdsa");
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
    putReceta = async ( req=request, res=response ) => {
        
        try {
            //en bodega solo se puede editar la cantidad y cantidadmin
            let {nombrePlato} = req.params
            let update = req.body
            let imagen = {
                data: req.file.filename,
                contentType: 'image/png'
            }
            console.log(imagen);
            
            //traer nombre prod-bodega
            const plato = await platoModel.find();

            let auxElemento = false
            plato[0].recetas.forEach(element => {
                if (element.nombrePlato == nombrePlato){
                    element.nombrePlato = update.nombrePlato;
                    element.categoria = update.categoria;
                    element.ingredientes = update.ingredientes;
                    element.minutosPreparacion = update.minutosPreparacion;
                    element.precio = update.precio;
                    element.imagen = imagen;
                    element.mostrar = update.mostrar
                    auxElemento = true;
                }
            });
            if(auxElemento){
                let aux = plato[0].recetas;
                await platoModel.findByIdAndUpdate(plato[0].id, {recetas:aux});
                res.status( 200 ).json({
                    status: 201,
                    msg: 'Receta modificada'
                });
            } else {
                res.status(500).json({
                    status:500,
                    msg:'Receta no existente',
                    descripcion:'El producto no existe'
                });
             }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el plato'
            });
        }

    }
    deleteReceta = async ( req=request, res=response ) => {
        
        try {
            let {nombrePlato} = req.params;
            let {estado} = req.query;
            let update = estado=='true'?true:false;

            const plato = await platoModel.find();

            let auxElemento = false
            plato[0].recetas.forEach(element => {
                if (element.nombrePlato == nombrePlato){
                    element.estado = update;
                    auxElemento = true;
                }
            });
            if(auxElemento){
                let aux = plato[0].recetas;
                await platoModel.findByIdAndUpdate(plato[0].id, {recetas:aux});
                res.status( 200 ).json({
                    status: 201,
                    msg: update?'Plato habilitado':'Plato deshabilitado'
                });
            } else {
            res.status(500).json({
                status:500,
                msg:'Plato no existente',
                descripcion:'El plato no existe'
            });
            }

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