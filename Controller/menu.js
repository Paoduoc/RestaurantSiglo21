const { response, request } = require('express');
const menuModel = require("../Model/menu");

class Menu {

    getMenu = async(req=request, res=response)=>{
        try {
            let{id} = req.params
            const menu = await menuModel.find()
            .populate({path:"platos"})
            .populate({path:"bodega"})
            //console.log(menu)
            let aux = false
            const productosBodega = {}
            menu[0].bodega.productosBodega.forEach(producto => {
                // aqui obtenemos el nombre del producto
                // que sera nuestra llave
                const llave = producto.nombreProducto
                if (productosBodega[llave]) {
                    // aqui tenemos que sumar el producto
                    productosBodega[llave] += 1
                } else {
                    // aqui entramos solo si la llave no existe
                    // la llave es el nombre del producto
                    productosBodega[llave] = producto.cantidad
                }
            });
            //console.log(productosBodega)

            const platosCocinables = []
            const productosPlatos = {}
            menu[0].platos.recetas.forEach(receta => {
                let esCocinable = true
                // aqui vemos si es cocinable
                receta.ingredientes.forEach(ingrediente => {
                    const llave = ingrediente
                    if (productosBodega[llave]) {
                        if (productosBodega[llave] >= 1) {
                            // entramos aqui solo si tiene el producto
                            // productosBodega[llave] -= 1
                        } else {
                            esCocinable = false
                        }
                    } else {
                        // entramos aqui si no tiene el producto en bodega
                        esCocinable = false
                    }
                });
                 // si es cocinable descontamos los productos
                if (esCocinable) {
                    receta.ingredientes.forEach(ingrediente => {
                        const llave = ingrediente
                        if (productosBodega[llave]) {
                            productosBodega[llave] -= 1
                        }
                    });
                    platosCocinables.push(receta)
                }
                
            });
            res.status( 200 ).json({
                status: 201,
                msg: platosCocinables
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro el menú'
            }); 
        }
    }
    getAllMenuInterno = async ( req=request, res=response ) => {
        
        try {
            const menu = await menuModel.find();
            res.status(200).json({
                status:200,
                msg:menu
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron menus'
            }); 
        }
    }
    getAllMenu = async ( req=request, res=response ) => {
        
        try {
            const menu = await menuModel.find();
            res.status(200).json({
                status:200,
                msg:menu
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron menus'
            }); 
        }
    }
    postMenu = async ( req=request, res=response ) => {
        
        try {

            let {nombreMenu, platos, bodega, estado} = req.body
            let menu = new menuModel({nombreMenu, platos, bodega, estado})
            await menu.save();
            res.status( 200 ).json({ 
                status: 201,
                msg: 'Menu creado' 
            });

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadio el menu'
            });
        }
    }
    putMenu = async ( req=request, res=response ) => {
        
        try {
            let {id} = req.params
            let {update} = req.body
            let menu = await menuModel.findByIdAndUpdate(id, update);
            res.status(200).json({
                status:200,
                msg:"OK"
            })
        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el menu'
            });

        }

    }
    deleteMenu = async ( req=request, res=response ) => {
        
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
            let menu = await menuModel.findByIdAndUpdate(id, update);
            menu.estado = est
            res.status(200).json({
                status:200,
                msg:menu
            })

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se deshabilitó el menu'
            });
        }
    }
}

module.exports = Menu;