const { response, request } = require('express');
const platoModel = require("../Model/plato");

class Plato
{
    
    getPlato = async ( req=request, res=response ) => {
        try {
            let {id} = req.params
            const plato = await platoModel.findById(id);
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
    postPlato = async ( req=request, res=response ) => {
        
        try {

            let {nombre, estado, ingredientes, preparacion, tiempoPreparacion, precio} = req.body
            let plato = new platoModel({nombre, estado, ingredientes, preparacion, tiempoPreparacion, precio})
            //const salt = bcryptjs.genSaltSync();
            //plato.contrasenna = bcryptjs.hashSync( contrasenna, salt );
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
                descripcion:'Ha ocurrido un error en el servidor, no se añadio el plato'
            });
        }
    }
    putPlato = async ( req=request, res=response ) => {
        
        try {
            let {id} = req.params
            let {nombre, precio} = req.body
            let plato = await platoModel.findByIdAndUpdate(id, {nombre}, {precio});
            //plato.nombre = nombre
            res.status(200).json({
                status:200,
                msg:plato
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
            let {id} = req.params
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
            let plato = await platoModel.findByIdAndUpdate(id, update);
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
                descripcion:'Ha ocurrido un error en el servidor, no se elimino el plato'
            });
        }
    }
}

module.exports = Plato;