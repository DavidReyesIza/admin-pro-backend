const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) =>{   // el next es propio de los middlewares y se utiliza si todo sale bien

    //Leer el token de los headers
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la peticion'
        });
    }

    try {

        const {uid} = jwt.verify(token,process.env.JWT_SECRETKEY); //Esto intentara hacer un match con la firma que tiene el token para verificar que es el token valido
        
        req.uid= uid; // esto sirve para que cuando pase la validacion de middleware y pase al siguiente campo, podamos pasar informacion por ejemplo el id
        next(); // sirve para salir del middleware y seguir con las demas ejecuciones si pasa el middleware
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });
        
    }




   
}


module.exports={
    validarJWT
}