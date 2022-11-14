const { response, request } = require('express');
const pedidoModel = require("../Model/pedido");
const boletaModel = require("../Model/boleta");
const platosModel = require("../Model/plato");
const usuarioModel = require("../Model/usuario");
const { formatoFecha } = require('../helpers/fecha');

class Boleta
{
    getBoleta = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const boleta = await boletaModel.findById(id);
            const pedido = await pedidoModel.find()
            const plato = await platosModel.find()
            const usuario = await usuarioModel.find()
            let totalSP
            let totalProp
            let totalCP
            let idpedido = boleta.pedidoID
            let garzonB 
            let platosConsumidos
            let precioU
            let sumaCant =[]
            let detalle= {
                nboleta: '',
                fecha: '',
                garzon: '',
                cantidad: [],
                total:"",
                propina:"",
                totaltotal:"" 
            }
            pedido.forEach(npedido => {
                if (String(npedido._id).toString() == String(idpedido).toString()) {
                    totalSP = npedido.totalPedido
                    totalProp = (npedido.totalPedido * 10 )/ 100
                    totalCP = npedido.totalPedido + totalProp
                    usuario.forEach(usuarioM => {
                        console.log(usuarioM.rol);
                        console.log(npedido.garzon);
                        if (usuarioM.rol === npedido.garzon) {
                            console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                        } else {
                            console.log(usuarioM.nombre);
                        }
                    });
                    npedido.platosID.forEach( (platosP, index) => {
                        plato.forEach(platosM => {
                            if ( platosP.id == platosM._id) {
                                platosConsumidos = platosM.nombrePlato
                                precioU = platosM.precio
                                let data = {
                                    nom: platosConsumidos,
                                    cant: 0,
                                    precio: 0
                                }
                                data.cant = data.cant + 1
                                data.precio = data.precio + precioU
                                sumaCant.push(data)
                                //console.log(sumaCant);
                            }
                        });
                    });
                }

                detalle.nboleta = boleta._id
                detalle.fecha= boleta.fechaB
                detalle.garzon = garzonB
                detalle.cantidad = sumaCant
                detalle.total = totalSP
                detalle.propina = totalProp
                detalle.totaltotal = totalCP
            });
            //console.log(detalle);
            res.status(200).json({
                status:200,
                msg:detalle
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro la boleta'
            }); 
        }

    }
    //Obtiene todos los accesos
    getAllBoletas = async ( req=request, res=response ) => {
        
        try {
            const boleta = await boletaModel.find();
            res.status(200).json({
                status:200,
                msg:boleta
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron boletas'
            }); 
        }

    }
    //Genera nuevos accesos
    postBoleta = async ( req=request, res=response ) => {
        
        try {
            let {pedidoID, estado, fechaB} = req.body
            let boleta = new boletaModel({pedidoID, estado, fechaB})
            boleta.estado = true
            await boleta.save();
            if ( !fechaB ) {
                fechaB= await formatoFecha(new Date())
                await boletaModel.findByIdAndUpdate(boleta.id, {fechaB:fechaB});
            }
            res.status( 200 ).json( { 
                status: 201,
                msg: 'Boleta creada' 
            });
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadió la boleta'
            });
        }
    
    }
    //Modifica los accesos mediante mongoID
    putBoleta = async ( req=request, res=response ) => {
        
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

}

module.exports = Boleta;