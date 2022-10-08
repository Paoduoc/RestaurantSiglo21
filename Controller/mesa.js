const { response, request } = require('express');
const mesaModel = require("../Model/mesa");

class Mesa
{
    //maneras de obtener datos del request
    //1 - una manera es con request.body
    //2 - request.params (URL)
    //3 - request.query (URL) 
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
    postMesa = async ( req=request, res=response ) => {
        
        try {
            let {numMesa,estado,cantSillas} = req.body
            let mesa = new mesaModel({numMesa,estado,cantSillas})

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
    putMesa = async ( req=request, res=response ) => {
        
        try {

            let {id} = req.params
            let {estado, ...update} = req.body
            let mesa = await mesaModel.findByIdAndUpdate(id, {update});
            mesa.numMesa = numMesa
            res.status(200).json({
                status:200,
                msg:mesa
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

module.exports = Mesa;