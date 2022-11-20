const { validationResult } = require('express-validator');

const validadorCampos = ( req, res, next) => {

    //Validación de campos, valida que no esten vacios
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status( 400 ).json( {  
            status: 400, 
            msg: "Bad Request",
            description: errores.errors[0].msg  
        } );
    }

    next();
}

module.exports = { validadorCampos }