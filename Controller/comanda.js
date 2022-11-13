const { response, request } = require('express');
const comandaModel = require("../Model/comanda");

class Mesa
{
    getComanda = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            /* const comanda = await comandaModel.findById(id)
            .populate({path:"plato",select:"platosID"}); */

            const comanda = await comandaModel.find()
                .populate(plato, {path: 'platodID[0].id'});
            res.status(200).json({
                status:200,
                msg:comanda
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro la comanda'
            }); 
        }

    }
    getAllComandas = async ( req=request, res=response ) => {
        
        try {
            
            const comanda = await comandaModel.find({estadoPedido:
                ["Pendiente", "En preparación", "Listo", "Entregado"]}).
                populate({path:'plato', select: 'platosID.id'});
            res.status(200).json({
                status:200,
                msg:comanda
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron comandas'
            }); 
        }

    }
    putComanda = async ( req=request, res=response ) => {
        
        try {
            //el combobox de estadoPedido debe ser: Pendiente, En preparación, Listo, Finalizado
            let {id} = req.params
            let {estadoPedido} = req.body
            await comandaModel.findByIdAndUpdate(id, {estadoPedido:estadoPedido});
            if (estadoPedido == "Finalizado" ) {
                await comandaModel.findByIdAndUpdate(id, {estado:false});
            } else {
                await comandaModel.findByIdAndUpdate(id, {estado:true});
            }
            res.status(200).json({
                status:200,
                msg:"OK"
            })
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

module.exports = Mesa;