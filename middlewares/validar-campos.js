const {response} = require('express');
const {validationResult} = require('express-validator')

// todo esto es un custom middleware para hacer validaciones
const validarCampos = (req, res=response, next) =>{
    
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()

        });
    }

    next();

}

module.exports = {
    validarCampos
}