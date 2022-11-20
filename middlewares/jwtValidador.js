const { request, response} = require("express");
const jwt = require("jsonwebtoken");
const usuarioModel = require('../Model/usuario');
const accesoModel = require('../Model/acceso');
const accesoRolModel = require('../Model/accesoRol');

const validaAccesoToken = async (  req = request, res, next ) => {

    const token = req.header('TOKEN'); //token de acceso
    const ruta = req.baseUrl; //endpoint ej. /api/v1/accesos
    const metodo = req.method; //metodo ej. GET

    //primera validación, verificacion de que el token sea correcto
    try {

        if ( !token ) {
            return res.status(401).json({ 
                status: 401,  
                msg: "Unauthorized", 
                description: 'Sin autorización' 
            });
        }

        const { id } = jwt.verify( token, process.env.FIRMA);


        const usuario = await usuarioModel.findById( id )
        .populate({path: 'rol', select: 'nombre'})
        
        //Si el token es correcto busca al usuario correspondiente por el mongo ID y se procede a la segunda validación
        //Existencia del usuario
        if ( !usuario ) {

            return res.status(401).json({ 
                status: 401, 
                msg: "Unauthorized", 
                description: 'El usuario no existe' 
            });

        }
        //tercera validación, si el rol del usuario esta permitido para esa ruta si no es un usuario root
        if ( usuario.rol.nombre != 'Root' ) {
            //cuarta validación, estado del usuario
            if (usuario.estado == false ) {

                return res.status(401).json({ 
                    status: 401, 
                    msg: "Unauthorized", 
                    description: 'Sin autorización estado' 
                });
            
            }
            else {

                const acceso = await accesoModel.findOne( { ruta : ruta } )
                console.log(acceso);
                //Quinta validación, se valida que el usuario tenga acceso a esa ruta con su rol
                if (acceso) {
                    const accesoRol = await accesoRolModel.findOne( { rol: usuario.rol._id, acceso: acceso._id } )
                    .populate({path:"rol", select:"nombre"})
                    console.log(accesoRol)
                    let flag = false;

                    console.log(metodo);
                    //cuando acceso rol es null no entra al siguiente if
                    if (accesoRol) {
                        switch (metodo) {
                            case 'GET':
                                flag = accesoRol.leer;
                                console.log(accesoRol.leer);
                                break;
                            case 'POST':
                                flag = accesoRol.crear;
                                break;
                            case 'PUT':
                                flag = accesoRol.modificar;
                                break;
                            case 'DELETE':
                                flag = accesoRol.eliminar;
                                break;
                            default:
                                flag = false
                            break;
                        }

                        if( flag ) {
                            req.usuario = usuario
                            next() 
                        }
                        else {
        
                            return res.status(401).json({ 
                                status: 401,  
                                msg: "Unauthorized", 
                                description: 'Usuario sin accesos al modulo' 
                            });
        
                        }

                    //por lo tanto cae a este else
                    } else {
                        return res.status(401).json({ 
                            status: 401,  
                            msg: "Unauthorized", 
                            description: 'Usuario sin accesos al modulo' 
                        });
                    }
                } else {
                    return res.status(401).json({ 
                        status: 401,  
                        msg: "Unauthorized", 
                        description: 'Accesos no definidos '+ruta 
                    });
                }

            }
            
            
        }
        else {
            req.usuario = usuario;
            next();
        }

        

    } catch (error) {
        console.log(error)
        return res.status(401).json({ 
            status: 401, 
            msg: 'Unauthorized', 
            description: 'El Token no es valido' 
        });

    }
}

module.exports = { validaAccesoToken };