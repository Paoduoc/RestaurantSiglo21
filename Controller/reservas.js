const { response, request } = require('express');
const reservasModel = require("../Model/reservas");

class Reserva
{
    //maneras de obtener datos del request
    //1 - una manera es con request.body
    //2 - request.params (URL)
    //3 - request.query (URL) 

    //obtiene una mesa según mongoID
    getmesa = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const mesa = await mesaModel.findById(id);
            res.status(200).json({
                status:200,
                msg:mesa
            })


        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro la mesa'
            }); 
        }

    }
    //Obtiene todas las mesas
    getAllmesas = async ( req=request, res=response ) => {
        
        try {
            const mesa = await mesaModel.find();
            res.status(200).json({
                status:200,
                msg:mesa
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron mesas'
            }); 
        }
    }
    //Genera una mesa nueva
    postMesa = async ( req=request, res=response ) => {
        try {
            let {numMesa,cantSillas} = req.body
            let mesa = new mesaModel({numMesa,cantSillas})
            await mesa.save();
            res.status( 200 ).json( { 
                status: 201,
                msg: 'Mesa creada' 
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadieron mesas'
            });
        }
    }
    //Modifica mesa según mongoID
    putMesa = async ( req=request, res=response ) => {
        try {
            let {id} = req.params
            let {estado, ...update} = req.body
            await mesaModel.findByIdAndUpdate(id, update);
            res.status(200).json({
                status:200,
                msg:"OK"
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico la mesa'
            });
        }
    }
    //Se deshabilita mesa según mongoID
    deleteMesa = async ( req=request, res=response ) => {
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
            let mesa = await mesaModel.findByIdAndUpdate(id, update);
            mesa.estado = est
            res.status(200).json({
                status:200,
                msg:estado
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se elimino la mesa'
            });
        }
    }
}

module.exports = Reserva;