const { response, request } = require('express');
const proveeModel = require("../Model/proveedor");

class Proveedor
{
    getProv = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const proveedor = await proveeModel.findById(id);
            res.status(200).json({
                status:200,
                msg:proveedor
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro proveedor'
            }); 
        }

    }
    getAllProv = async ( req=request, res=response ) => {
        
        try {
            const proveedor = await proveeModel.find();
            res.status(200).json({
                status:200,
                msg:proveedor
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron proveedores'
            }); 
        }

    }
    postProv = async ( req=request, res=response ) => {
        
        try {
            let {nombreProvee,estado,tipoProd,ncontacto,correo, direccion} = req.body
            let proveedor = new proveeModel({nombreProvee, estado, tipoProd, ncontacto, correo, direccion})

            await proveedor.save();
            res.status( 200 ).json( { 
                status: 201,
                msg: 'Proveedor creado' 
            });
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadieron proveedores'
            });
        }
    
    }
    putProv = async ( req=request, res=response ) => {
        
        try {

            let {id} = req.params
            let {estado,...update} = req.body
            let proveedor = await proveeModel.findByIdAndUpdate(id, ...update);
            res.status(200).json({
                status:200,
                msg:proveedor
            })
            //Se envia msg acceso solo para ver el que el acceso haya cambiado realmente, evidencias para BACK

        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el proveedor'
            });

        }

    }
    deleteProv = async ( req=request, res=response ) => {
        
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
            let proveedor = await proveeModel.findByIdAndUpdate(id, update);
            proveedor.estado = est
            res.status(200).json({
                status:200,
                msg:estado
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se elimino el proveedor'
            });
        }

    }

}

module.exports = Proveedor;