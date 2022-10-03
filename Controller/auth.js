const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
//const { generarJWT, googleVerify, generatePassword } = require('../../helpers/auth');
const jwt = require("jsonwebtoken");

class Auth{
    

    login = async (  req=request, res=response ) => {

        try {

            let { email, password } = req.body;

            /* let user = await UserModel.findOne({ email: email });

            if (user === null) {

                res.status(404).json({
                    status: 404, 
                    msg: 'Not Found',
                    description: 'No existe ningun usuario relacionado con este correo'
                });

            } else {
                
                if ( !user.status ) {
                    return res.status( 400 ).json({
                        status: 400,
                        msg: 'Bad Request',
                        description: 'Usuario o Contraseña no son correctos'
                    });
                }

                const validPassword = bcryptjs.compareSync( password, user.password )

                if ( !validPassword ) {
                    return res.status( 400 ).json({
                        status: 400,
                        msg: 'Bad Request',
                        description: 'Usuario o Contraseña no son correctos'
                    });
                }

                const token = await generarJWT( user.id ); */

                /* res.status( 200 ).json({
                    status: 200,
                    msg: {
                        "name": `${user.name} ${user.lastName}`,
                        "email": user.email,
                        token }
                });
            }
 */
            res.status( 200 ).json({
                status: 200,
                msg: "OK"
            });
        } catch (error) {
            
            console.log(error);

        }
    }

    /* googleSignIn = async ( req = request,res = response ) => {

        const { id_token } = req.body;
        try {

            const { email, name, lastName } = await googleVerify( id_token );
            
            let user = await UserModel.findOne({ 
                where: { email: email } 
            });
            
            if( user === null ) {

                const password = generatePassword();
                const data = {
                    email: email, password: password , name: name, lastName: lastName, google: 1, role: 2
                }

                let user = await UserModel.create(data);

                const token = await generarJWT( user.id );
            
                res.status( 201 ).json({
                    status: 201,
                    msg: { name: name, lastName: lastName, email: email, token }
                });

            } else {

                if( !user.status ) {
                    console.log(user.status)
                    return res.status( 401 ).json({ status: 401,  msg: "Unauthorized", description: 'Sin autorización' });
    
                }
    
                const token = await generarJWT( user.id );
                
                res.status( 200 ).json({
                    status: 200,
                    msg: { name: name, lastName: lastName, email: email, token}
                });

            }

            
            

        } catch (error) {
            console.log(error);
            res.status( 400 ).json({ status: 500, msg: "Internal Server Error", description:'No se pudo verificar el token' })
        }

    } */


}

module.exports = Auth;