const { response, request } = require('express');
const platoModel = require("../Model/plato");
const bodegaModel = require("../Model/bodega");

class Menu {

    getMenu = async(req=request, res=response)=>{
        try {
            const platos = await platoModel.find()
            const bodega = await bodegaModel.find()
            const productoBodega = {}
            let cantP = 0
            let min = 0
            bodega.forEach(producto => {
                producto.productosBodega.forEach(element => {
                    min = element.cantidadMin
                    let llave = element.nombreProducto
                    if (productoBodega[llave]) {
                        productoBodega[llave] += element.gramos
                    } else {
                        productoBodega[llave] = element.gramos
                    }
                });
            });
            //console.log(productoBodega)
            const platosCocinables = []
            let num =0
            
            platos.forEach(recetas => {
                let receta = {
                    nombrePlato:"",
                    descripcion:"",
                    categoria:"",
                    ingredientes:"",
                    precio:"",
                    imagen:"",
                    cantP:"" 
                }
                let productoBodega1 = []
                let cantidadIng=[]
                console.log(receta);
                let esCocinable = true
                recetas.ingredientes.forEach(ingre => {
                    const nom = ingre.nom
                    const cant = ingre.cant
                    const llave = nom
                    if (productoBodega[llave] >= min) {
                        if (productoBodega[llave] >= cant) {
                            productoBodega1.push(Number(productoBodega[llave]))
                            cantP = Number(productoBodega[llave])/Number(cant)
                            cantidadIng.push(cantP)
                        } else {
                            esCocinable = false
                        }
                    } else {
                        esCocinable = false
                    }
                });
                if (esCocinable) {
                    num=Math.min(...cantidadIng);
                    receta.nombrePlato = recetas.nombrePlato
                    receta.descripcion = recetas.descripcion
                    receta.categoria = recetas.categoria
                    receta.ingredientes = recetas.ingredientes
                    receta.precio = recetas.precio
                    receta.imagen = recetas.imagen
                    receta.cantP = num
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
}

module.exports = Menu;