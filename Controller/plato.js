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

    postPlato = async ( req=request, res=response )=> {
        
        try {
            let update = req.body
            let imagen = 'http://localhost:8080/api/v1/platos/images/' + req.file.filename
            let plato = new platoModel({...update, imagen})
            await plato.save();
            res.status( 200 ).json( { 
                status: 201,
                msg: 'Plato creado' 
            });

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadió el plato'
            });
        }
    }
    putPlato = async ( req=request, res=response ) => {
        
        try {
            let {id} = req.params
            let {estado, ...update} = req.body
            let imagen = 'http://localhost:8080/api/v1/platos/images/' + req.file.filename
            await platoModel.findByIdAndUpdate(id, {...update, imagen});
            res.status(200).json({
                status:200,
                msg:"Plato editado"
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modificó el plato'
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
                est= false
            }
            let plato = await platoModel.findByIdAndUpdate(id, update);
            plato.estado = est
            res.status(200).json({
                status:200,
                msg:estado
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