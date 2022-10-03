const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const accesoModel = require("../Model/acceso");

class Acceso
{
    //maneras de obtener datos del request
    //1 - una manera es con request.body
    //2 - request.params (URL)
    //3 - request.query (URL) 
    getAcceso = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const acceso = await accesoModel.findById(id);
            res.status(200).json({
                status:200,
                msg:acceso
            })


        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro el acceso'
            }); 
        }

    }
    getAllAccesos = async ( req=request, res=response ) => {
        
        try {
            const accesos = await accesoModel.find();
            res.status(200).json({
                status:200,
                msg:accesos
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron accesos'
            }); 
        }

    }
    postAcceso = async ( req=request, res=response ) => {
        
        try {
            let {ruta} = req.body
            let acceso = new accesoModel({ruta})

            await acceso.save();
            res.status( 200 ).json( { 
                status: 201,
                msg: 'Acceso creado' 
            });
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadieron accesos'
            });
        }
    
    }
    putRol = async ( req=request, res=response ) => {
        
        try {

            let {id} = req.params
            let {ruta} = req.body
            let acceso = await accesoModel.findByIdAndUpdate(id, {ruta});
            acceso.ruta = ruta
            res.status(200).json({
                status:200,
                msg:acceso
            })

        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el acceso'
            });

        }

    }
    deleteRol = async ( req=request, res=response ) => {
        
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
            let acceso = await accesoModel.findByIdAndUpdate(id, update);
            acceso.estado = est
            res.status(200).json({
                status:200,
                msg:estado
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se elimino el acceso'
            });
        }

    }

}

module.exports = Acceso;