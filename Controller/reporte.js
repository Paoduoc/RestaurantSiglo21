const { response, request } = require('express');
//const proveeModel = require("../Model/reporte");
const boletaModel = require("../Model/boleta");
const pedidoModel = require("../Model/pedido");
const transaccionModel = require("../Model/transaccion");


class Reporte
{

    //modificar - no tiene que ser el de la boleta, si no el de la transferencia
    //dejar el punto 3 listo con la cantida de pedidos por dia mes y año
    getGananciasTotalesDia = async ( req=request, res=response ) => {

        try {
            let {fecha} = req.body
            const boleta = await boletaModel.find();
            const transaccion = await transaccionModel.find();
            let totales = 0;

            transaccion.forEach( elementA => {
                    
                if (fecha == elementA.fechaB.slice(0, 10)) {
                    pedido.forEach ( elementB => {
                        if (elementA.pedidoID == elementB.id) { 
                            totales += elementB.totalPedido;
                        }
                    });
                };
            });
            res.status(200).json({
                status:200,
                msg:totales
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro proveedor'
            }); 
        }

    }
    getGananciasTotalesMes = async ( req=request, res=response ) => {

        try {
            let {fecha} = req.body
            const boleta = await boletaModel.find();
            const pedido = await pedidoModel.find();
            let totales = 0;

            boleta.forEach( elementA => {
                elementA.fecha
                if (fecha == elementA.fechaB.slice(0, 10)) {
                    pedido.forEach ( elementB => {
                        if (elementA.pedidoID == elementB.id) { 
                            totales += elementB.totalPedido;
                        }
                    });
                };
            });
            res.status(200).json({
                status:200,
                msg:totales
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro proveedor'
            }); 
        }

    }
    getClientesTotales = async ( req=request, res=response ) => {
        
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
    getPlatosConsumidos = async ( req=request, res=response ) => {
        
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
    getTiempoPlatos = async ( req=request, res=response ) => {
        
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

module.exports = Reporte;