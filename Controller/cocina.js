const { response, request } = require('express');
const cocinaModel = require("../Model/cocina");

class Cocina
{
    //maneras de obtener datos del request
    //1 - una manera es con request.body
    //2 - request.params (URL)
    //3 - request.query (URL) 

    //obtiene una comanda mediante mongoID
    getComanda = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const comanda = await cocinaModel.findById(id);
            res.status(200).json({
                status:200,
                msg:comanda
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro la comanda'
            }); 
        }

    }
    //Obtiene todos los accesos
    getAllComandas = async ( req=request, res=response ) => {
        
        try {
            const comanda = await cocinaModel.find();
            res.status(200).json({
                status:200,
                msg:comanda
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron comandas'
            }); 
        }

    }
    //Genera nuevos accesos
    postComanda = async ( req=request, res=response ) => {
        
        try {
            let {id} = req.params
            let {...update} = req.body
            
            let comanda = new cocinaModel({ruta})

            await comanda.save();
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
    //Modifica los accesos mediante mongoID
    putComanda = async ( req=request, res=response ) => {
        
        try {

            let {id} = req.params
            let {ruta} = req.body
            let acceso = await accesoModel.findByIdAndUpdate(id, {ruta});
            acceso.ruta = ruta
            res.status(200).json({
                status:200,
                msg:acceso
            })
            //Se envia msg acceso solo para ver el que el acceso haya cambiado realmente, evidencias para BACK

        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el acceso'
            });

        }

    }
    //Deshabilita el acceso mediante mongo ID
    deleteComanda = async ( req=request, res=response ) => {
        
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

module.exports = Cocina;