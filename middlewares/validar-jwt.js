const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
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

const validarADMIN_ROLE = async(req,res,next) =>{

    const uid = req.uid;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if(usuarioDB.role !== 'ADMIN_ROLE' ){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        next();


        
    } catch (error) {
        console.log(error)
        response.status(500).json({
            ok: false,
            msg: ' Hable con el administrador'

        })
    }


}

const validarADMIN_ROLE_o_MismoUsuario = async(req,res,next) =>{

    const uid = req.uid;
    const id = req.params.id // Esto viene de la ruta arriba que el usuario pasa para editar

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }



        if(usuarioDB.role === 'ADMIN_ROLE' || uid ===id ){
        next();
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        


        
    } catch (error) {
        console.log(error)
        response.status(500).json({
            ok: false,
            msg: ' Hable con el administrador'

        })
    }


}


module.exports={
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}