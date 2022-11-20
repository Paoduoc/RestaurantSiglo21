const { createPayment, getStatus } = require('../helpers/flow');
const boletaModel = require("../Model/boleta");
const transaccionModel = require("../Model/transaccion");

class Transaccion
{
    postFlow = async ( req, res ) => {

        try {

            const { id } = req.params;
            
            const transaccionM = await transaccionModel.findById(id)

            if ( transaccionM.status == 2 ) {
                
                res.status(500).json({
                    status: 500, 
                    msg: 'Internal Server Error',
                    description: 'El movimiento ya está pagado'
                });
            } else {

                const info = {
                    amount: transaccionM.total,
                    commerceOrder: `RT-21${transaccionM._id}`,
                    email: "restaurantsiglo21p@gmail.com",
                    subject: "PAGO BOLETA RESTAURANT SIGLO 21"
                }

                await createPayment( info )
                .then( async ( data ) => {
                    console.log(data);
                    let update = {
                        token: data.token
                    }
                    await transaccionModel.findByIdAndUpdate(id ,{token:data.token})
                    res.status(200).json({ status:200, msg:  `${data.url}?token=${data.token}` });
                })
                .catch( err => {
                    console.log("🚀 ~ file: flow.js ~ line 41 ~ Flow ~ postFlow= ~ err", err)
                    let update = {
                        status: 3
                    }
                    
                    res.status(500).json({
                        status: 500, 
                        msg: 'Internal Server Error',
                        description: 'Error al crear la orden de compra'
                    });

                });

            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500, 
                msg: 'Internal Server Error',
                description: 'Error al crear la orden de compra'
            });
        }

    }
    getFlow = async ( req, res ) => {

        try {

            const { token } = req.body;            

            await getStatus( token ).then( data => {

                res.status(200).json({ status:200, msg:  data });
                
            })
            .catch( err => {

                res.status(500).json({
                    status: 500, 
                    msg: 'Internal Server Error',
                    description: 'Error al consultar la orden de compra'
                });

            })

            

        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500, 
                msg: 'Internal Server Error',
                description: 'Error al consultar la orden de compra'
            });
        }

    }
    putFlow = async ( req, res ) => {

        try {

            const { token } = req.body;            
            
            await getStatus( token )
            .then( async (data) => {
                console.log("log 1", data);
                if (data.status == 2) {


                    let tx = await transaccionModel.findOne({token:token});

                    await transaccionModel.findByIdAndUpdate(tx._id,{estatus:2})
                    
                    res.status(200).json({ status:200, msg:  data });
                    
                }if (data.status == 3) {
                    let tx = await transaccionModel.findOne({token:token});

                    await transaccionModel.findByIdAndUpdate(tx._id,{estatus:3})
                    
                    res.status(400).json({ status:400, msg:  data, description: "Pago rechazado" });
                    console.log("Pago rechazado");
                }
                
                
            })
            .catch( async (err) => {
                
                console.log("log 2", err);
                await transaccionModel.findByIdAndUpdate(tx._id,{estatus:3})

                res.status(500).json({
                    status: 500, 
                    msg: 'Internal Server Error',
                    description: 'Error al actualizar la orden de compra'
                });

            })

            

        } catch (error) {
            console.log("log 3", err);
            res.status(500).json({
                status: 500, 
                msg: 'Internal Server Error',
                description: 'Error al actualizar la orden de compra'
            });
        }

    }
}

module.exports = Transaccion;