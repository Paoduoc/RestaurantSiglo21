const { response, request } = require('express');
const cajaModel = require("../Model/caja");

class Caja
{
    //maneras de obtener datos del request
    //1 - una manera es con request.body
    //2 - request.params (URL)
    //3 - request.query (URL) 

    //obtiene un acceso mediante mongoID
    gettransaccion = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const caja = await cajaModel.findById(id);
            res.status(200).json({
                status:200,
                msg:caja
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro el movimiento de dinero'
            }); 
        }

    }
    //Obtiene todos los accesos
    getAlltransaccion = async ( req=request, res=response ) => {
        
        try {
            const caja = await cajaModel.find();
            res.status(200).json({
                status:200,
                msg:caja
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron movimientos de dinero'
            }); 
        }

    }
    //Genera nuevos accesos
    posttransaccion = async ( req=request, res=response ) => {
        
        try {
            let {boleta,estatus,total,metodo} = req.body
            let caja = new cajaModel({boleta,estatus,total,metodo})

            await caja.save();
            res.status( 200 ).json( { 
                status: 201,
                msg:caja
            });
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadió la transacción'
            });
        }
    
    }
    //Modifica los accesos mediante mongoID
    puttransaccion = async ( req=request, res=response ) => {
        
        try {

            let {id} = req.params
            let {total,metodo} = req.body
            await cajaModel.findByIdAndUpdate(id, {total,metodo});
            res.status(200).json({
                status:200,
                msg:"OK"
            })
            //Se envia msg acceso solo para ver el que el acceso haya cambiado realmente, evidencias para BACK

        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modificó la transacción'
            });

        }
    }
    

}

module.exports = Caja;