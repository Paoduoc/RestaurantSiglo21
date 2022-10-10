const jwt = require("jsonwebtoken");
//Aqui generamos el Jsonwebtoken
const generarJWT = ( id = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { id };
        //Se encripta el ID y se establece duración del token
        jwt.sign( payload, process.env.FIRMA, {
            expiresIn: '4hrs'
        }, ( error, token ) => { 

            if(error){
                reject( 'No se pudo generar el token' );
            } else {
                resolve( token );
            }

        })

    });
    
}

module.exports = { 
    generarJWT
};
