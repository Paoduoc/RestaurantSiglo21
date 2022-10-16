const { response, request } = require('express');
const menuModel = require("../Model/menu");

class Menu {

    getMenu = async ( req=request, res=response ) => {
        try {
            let {id} = req.params
            const menu = await menuModel.findById(id);
            res.status(200).json({
                status:200,
                msg:menu
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro el menu'
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

            let {nombreMenu, platos, estado} = req.body
            let menu = new menuModel({nombreMenu, platos, estado})
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