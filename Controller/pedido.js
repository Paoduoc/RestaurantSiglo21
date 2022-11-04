const { response, request } = require('express');
const pedidoModel = require("../Model/pedido");
const { formatoFecha } = require('../helpers/fecha');
const cocinaModel = require("../Model/cocina");

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
            let {fechaIP} = req.body
            console.log(fechaIP)
            
            const pedido = await pedidoModel.find();

            let listaPedidos = [];

            pedido.forEach( (element, index) => {
                
                if (element.fechaIP) {
                    
                    const date = new Date(String(element.fechaIP));
                    let day = date.getDate();
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();
                    let fecha = `${year}-${month}-${day}`
                    if (fecha == fechaIP) {
                        listaPedidos.push(element)
                    }
                }
            });
            res.status(200).json({
                status:200,
                msg:{pedido: listaPedidos}
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron pedidos para ese dia'
            }); 
        }
    }
    postPedido = async ( req=request, res=response ) => {
        
        try {
            let {platos, fechaIP, estado, fechaTP, mesa, garzon, comentariosPlato, comentariosDevolucion, preciosU, totalPedido} = req.body
            let pedido = new pedidoModel({platos, estado, fechaTP, mesa, garzon, comentariosPlato, comentariosDevolucion, preciosU, totalPedido})
            pedido.estado = true
            //let cocina = new cocinaModel({platos})
            //await cocina.save();
            await pedido.save();
            if ( !fechaIP ) {
                fechaIP= await formatoFecha(new Date())
                await pedidoModel.findByIdAndUpdate(pedido.id, {fechaIP:fechaIP});
            }
            let suma = 0
            for (let n of preciosU) {
                suma +=n;
                await pedidoModel.findByIdAndUpdate(pedido.id, {totalPedido:suma});
            }
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
            let {estado, fechaIP, fechaTP, mesa, garzon, ...update} = req.body
            let pedidoId = await pedidoModel.findById(id);
            let plt = []
            pedidoId.platos.forEach(element => {
                plt.push(element)
            });
            plt.push(update.platos)
            await pedidoModel.findByIdAndUpdate(id, {platos:plt});
            let newprecios = []
            let suma = 0
            pedidoId.preciosU.forEach(element1 => {
                newprecios.push(element1)
            });
            newprecios.push(update.preciosU)
            suma = update.preciosU + pedidoId.totalPedido;
            await pedidoModel.findByIdAndUpdate(id, {preciosU:newprecios, totalPedido:suma, comentariosPlato:update.comentariosPlato, comentariosDevolucion:update.comentariosDevolucion });
            
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
    putPedidoTerminado = async ( req=request, res=response ) => {
        
        try { 

            let {id} = req.params
            let {fechaIP, fechaTP, mesa, garzon, platos, comentariosPlato, comentariosDevolucion, totalPedido,...update} = req.body
            update.fechaTP= await formatoFecha(new Date())
            update.estado = false
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
                descripcion:'Ha ocurrido un error en el servidor, no se genero la devolución'
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