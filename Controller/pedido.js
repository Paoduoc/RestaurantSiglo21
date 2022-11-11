const { response, request } = require('express');
const pedidoModel = require("../Model/pedido");
const { formatoFecha } = require('../helpers/fecha');
const cocinaModel = require("../Model/comanda");
const platosModel = require("../Model/plato");
const bodegaModel = require("../Model/bodega");

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
            const pedido = await pedidoModel.find();
            let listaPedidos = [];
            pedido.forEach( element => {
                if (element.fechaIP) {
                    const date = new Date(String(element.fechaIP));
                    let day = date.getDate();
                    if (day < 10) {
                        day = "0"+day
                    }
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
            let {platosID, fechaIP, estado, fechaTP, reserva, garzon, comentariosPlato, comentariosDevolucion, totalPedido} = req.body
            let pedido = new pedidoModel({platosID, estado, fechaTP, reserva, garzon, comentariosPlato, comentariosDevolucion, totalPedido})
            pedido.estado = true
            
            await pedido.save();
            if ( !fechaIP ) {
                fechaIP= await formatoFecha(new Date())
                await pedidoModel.findByIdAndUpdate(pedido.id, {fechaIP:fechaIP});
            }
            const platosBD = await platosModel.find()
            let suma = 0
            let precio = 0
            let ingP 
            let plat = pedido.platosID
            const bodega = await bodegaModel.find()
            const productoBodega = bodega[0].productosBodega
            let ingBD
            let nomBD
            pedido.platosID.forEach( (pl, index) => {
                platosBD.forEach(plbd => {
                    if (pl.id == plbd._id) {
                        precio = plbd.precio
                        suma += precio;
                        ingP = plbd.ingredientes
                        //console.log(ingP);
                        ingP.forEach(ingre => {
                            //console.log(ingre);
                            productoBodega.forEach(element => {
                                ingBD = element.gramos
                                nomBD = element.nombreProducto
                                if (ingre.nom === nomBD) {
                                    element.gramos = element.gramos - ingre.cant
                                }
                            });
                        });
                    }
                    pl.flag = true
                });
                plat[index].flag = true;
            });
            await pedidoModel.findByIdAndUpdate(pedido.id, {totalPedido:suma, platosID:plat});
            await bodegaModel.findByIdAndUpdate(bodega[0].id, {productosBodega:productoBodega});
            //let cocina = new cocinaModel({platos})
            //await cocina.save();
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
            let {estado, fechaIP, fechaTP, mesa, garzon, totalPedido, ...update} = req.body
            let pedidoId = await pedidoModel.findById(id);
            const platosBD = await platosModel.find()
            const bodega = await bodegaModel.find()
            const productoBodega = bodega[0].productosBodega
            let ingP 
            let plt = []
            let suma = 0
            let ingBD
            let nomBD
            pedidoId.platosID.forEach(pl => {
                plt.push(pl)
            });
            plt.push(...update.platosID)
            plt.forEach(pl => {
                platosBD.forEach(plbd => {
                    if (pl.id == plbd._id) {
                        suma += plbd.precio;
                        ingP = plbd.ingredientes
                        ingP.forEach(ingre => {
                            productoBodega.forEach(element => {
                                ingBD = element.gramos
                                nomBD = element.nombreProducto
                                console.log(ingre.nom);
                                console.log(nomBD);
                                console.log(pl.flag);
                                if (pl.flag == false) {
                                    if (ingre.nom === nomBD) {
                                        element.gramos = element.gramos - ingre.cant
                                        
                                    }
                                }
                            });
                        }); 
                    }
                });
                pl.flag = true
            });
            
            console.log(productoBodega);
            await pedidoModel.findByIdAndUpdate(id, {platosID:plt, totalPedido:suma, comentariosPlato:update.comentariosPlato, comentariosDevolucion:update.comentariosDevolucion });
            await bodegaModel.findByIdAndUpdate(bodega[0].id, {productosBodega:productoBodega});
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
            let {fechaIP, fechaTP, mesa, garzon, platosID, comentariosPlato, comentariosDevolucion, totalPedido,...update} = req.body
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
}

module.exports = Pedido;