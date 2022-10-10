const { response, request } = require('express');
const accesRolModel = require("../Model/accesoRol");

class AccesoRol
{
    //Obtiene un acceso según rol mediante mongoID
    getAccesRol = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const accesoRol = await accesRolModel.findById(id)
            .populate({path:"rol",select:"nombre"})
            .populate({path:"acceso",select:"ruta"})
            //Se concatenan el rol y el acceso para una mejor visualizacion de lo que se trae
            res.status(200).json({
                status:200,
                msg:accesoRol
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro el acceso por rol'
            }); 
        }

    }
    //Obtiene todos los accesos según rol
    getAllAccesRol = async ( req=request, res=response ) => {
        
        try {

            const accesoRol = await accesRolModel.find()
            .populate({path:"rol",select:"nombre"})
            .populate({path:"acceso",select:"ruta"})
            res.status(200).json({
                status:200,
                msg:accesoRol
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron accesos por rol'
            }); 
        }

    }
    //Genera nuevos accesos según rol
    postAccesRol = async ( req=request, res=response ) => {
        
        try {
            //No se envia el estado porque viene por defecto en true
            let {acceso, rol, crear, modificar, leer, eliminar} = req.body
            let accesoRol = new accesRolModel({acceso, rol, crear, modificar, leer, eliminar})
            await accesoRol.save();
            res.status( 200 ).json({ 
                status: 201,
                msg: 'Acceso por rol creado' 
            });

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadio el acceso por rol'
            });

        }

    }
    //Modifica los accesos según rol mediante mongoID
    putAcessRol = async ( req=request, res=response ) => {
        
        try {
            
            let {id} = req.params
            //Se podran modificar todos los campos menos el estado
            let {estado, ...update} = req.body
            let accesoRol = await accesoModel.findByIdAndUpdate(id, update);
            res.status(200).json({
                status:200,
                msg:accesoRol
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el acceso por rol'
            });
        }

    }
    //Deshabilita el acceso según rol mediante mongo ID
    deleteAccesRol = async ( req=request, res=response ) => {
        
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
            let accesoRol = await accesRolModel.findByIdAndUpdate(id, update);
            accesoRol.estado = est
            res.status(200).json({
                status:200,
                msg:accesoRol
            })

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se elimino el acceso por rol'
            });

        }

    }

}

module.exports = AccesoRol;