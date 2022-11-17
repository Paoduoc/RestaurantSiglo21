const { response, request } = require('express');
const cajaModel = require("../Model/caja");

class Caja
{
    //maneras de obtener datos del request
    //1 - una manera es con request.body
    //2 - request.params (URL)
    //3 - request.query (URL) 

    //obtiene un acceso mediante mongoID
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
    //Obtiene todos los accesos
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
    //Genera nuevos accesos
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
    //Modifica los accesos mediante mongoID
    putAcceso = async ( req=request, res=response ) => {
        
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
    deleteAcceso = async ( req=request, res=response ) => {
        
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

module.exports = Caja;