const { response, request } = require('express');
const comandaModel = require("../Model/comanda");
//si pedid o est aen true, se pueden pedir mas platos
// comanda debe tener hora y fecha de cuando llega a la comanda
//hora finalizacion
class Comanda
{
    /* getComanda = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const comanda = await comandaModel.find()
                //.populate(plato, {path: 'platodID[0].id'});
            let platoComanda
            let auxElemento = false
            comanda[0].platosComanda.forEach(element => {
                console.log(element.id);
                if (element.pedidoId == id){
                    platoComanda = element
                    auxElemento = true
                }
            });
            if (auxElemento){
                res.status( 200 ).json({
                    status: 201,
                    msg: platoComanda
                });
            } else {
                res.status(500).json({
                    status:500,
                    msg:'Comanda no existente',
                    descripcion:'La comanda no existe'
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro la comanda'
            }); 
        }
    } */
    getAllComandas = async ( req=request, res=response ) => {
        
        try {
            
            /* const comanda = await comandaModel.find({estadoPedido:
                ["Pendiente", "En preparación", "Listo", "Entregado"]})
                .populate({path:'platosComanda.plato', select: 'platosID.id'}); */
            const comanda = await comandaModel.find()
                .populate({path:'platosComanda.plato', select: 'platosID.id'});
            /* const comanda = await comandaModel.find()
            const comandas = comanda[0].platosComanda.populate({path:"plato",select:"platodID[0].id"}); */
            res.status(200).json({
                status:200,
                msg:comanda[0].platosComanda
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron comandas'
            }); 
        }

    }
    postComanda = async ( req=request, res=response ) => {
        
        try {

            let {platosComanda} = req.body
            let comanda = new comandaModel({platosComanda})
            await comanda.save();
            res.status(200).json({
                status: 201,
                msg: 'Comanda creada' 
            });
            
        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadio la comanda'
            });
        }
    }
    putComanda = async ( req=request, res=response ) => {
        //revisar porque lo esta haciendo en base al id del pedido y se modifican todos los platos de ese pedido
        try {
            //el combobox de estadoPedido debe ser: Pendiente, En preparación, Listo, Finalizado
            let {id} = req.params
            let {estadoPedido} = req.body

            const comanda = await comandaModel.find();
            let auxElemento = false
            comanda[0].platosComanda.forEach(element => {
                if (element.pedidoId == id){
                    element.estadoPedido = estadoPedido;
                    auxElemento = true;
                }
            });
            if(auxElemento){
                let aux = comanda[0].platosComanda;
                await comandaModel.findByIdAndUpdate(comanda[0].id, {platosComanda:aux});
                res.status( 200 ).json({
                    status: 201,
                    msg: 'Plato en comanda modificado'
                });
            } else {
                res.status(500).json({
                    status:500,
                    msg:'Plato no existente',
                    descripcion:'El plato en comanda no existe'
                });
            }




            /* await comandaModel.findByIdAndUpdate(id, {estadoPedido:estadoPedido});
            if (estadoPedido == "Finalizado" ) {
                await comandaModel.findByIdAndUpdate(id, {estado:false});
            } else {
                await comandaModel.findByIdAndUpdate(id, {estado:true});
            }
            res.status(200).json({
                status:200,
                msg:"OK"
            }) */
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico la comanda'
            });

        }

    }
}

module.exports = Comanda;