const { response, request } = require('express');
const pedidoModel = require("../Model/pedido");

class Pedido
{
    
    getPedido = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const pedido = await pedidoModel.findById(id);
            res.status(200).json({
                status:200,
                msg:pedido
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro el pedido'
            }); 
        }
    }
    getAllPedido = async ( req=request, res=response ) => {
        
        try {

            const pedido = await pedidoModel.find();
            res.status(200).json({
                status:200,
                msg:pedido
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron pedidos'
            });
        }

    }
    postPedido = async ( req=request, res=response ) => {
        
        try {

            let {platos, estado, fechaPedido, horaPedido, horaEntrega, mesa, garzon, comentarios} = req.body
            let pedido = new pedidoModel({platos, estado, fechaPedido, horaPedido, horaEntrega, mesa, garzon, comentarios})
            await pedido.save();
            res.status( 200 ).json({
                status: 201,
                msg: 'Pedido creado'
            });
        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadio el pedido'
            });
        }
    }
    putPedido = async ( req=request, res=response ) => {
        
        try {

            let {id} = req.params
            let {platos, estado, fechaPedido, horaPedido, horaEntrega, ...update} = req.body
            await pedidoModel.findByIdAndUpdate(id, update);
            res.status(200).json({
                status:200,
                msg:"OK"
            })

        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el pedido'
            });

        }

    }
    deletePedido = async ( req=request, res=response ) => {
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
            let pedido = await pedidoModel.findByIdAndUpdate(id, update);
            pedido.estado = est
            res.status(200).json({
                status:200,
                msg:"OK"
            })

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se elimino el pedido'
            });
        }
    }
}

module.exports = Pedido;