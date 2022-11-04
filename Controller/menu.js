const { response, request } = require('express');
const platoModel = require("../Model/plato");
const bodegaModel = require("../Model/bodega");

class Menu {

    getMenu = async(req=request, res=response)=>{
        try {
            const platos = await platoModel.find()
            const bodega = await bodegaModel.find()
            const productoBodega = {}
            bodega.forEach(producto => {
                producto.productosBodega.forEach(element => {
                    const llave = element.nombreProducto
                    if (productoBodega[llave]) {
                        productoBodega[llave] += 1
                    } else {
                        productoBodega[llave] = element.gramos
                    }
                });
            });
            console.log(productoBodega)
            const platosCocinables = []
            platos.forEach(recetas => {
                let esCocinable = true
                recetas.ingredientes.forEach(ingre => {
                    const nom = ingre.nom
                    const cant = ingre.cant
                    const llave = nom
                    if (productoBodega[llave] >= 1) {
                        if (productoBodega[llave] >= cant) {
                            console.log(productoBodega[llave]);
                        } else {
                            esCocinable = false
                        }
                    } else {
                        esCocinable = false
                    }
                });
                if (esCocinable) {
                    platosCocinables.push(recetas.nombrePlato, recetas.descripcion, recetas.categoria, recetas.ingredientes, recetas.precio, recetas.imagen)
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
}

module.exports = Menu;