const Usuario = require('../models/usuario')
const {response} = require('express');


// npm i bcryptjs este es el comando de instalacion de la libreria para encriptar contraseñas y abajo esta la importacion de la misma con el nombre que nosotros queramos
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async(request, res)=>{

    const usuarios = await Usuario.find({},'nombre email role google');

    res.json({
        ok: true,
        usuarios,
        uid: request.uid  // Este uid Viene del middleware que permite pasar informacion a este GetUsuarios ya que esta a la par en el path o la ruta
        //este uid es el uid del usuario que hizo la peticion para ver los usuarios que lo provee JWT
    })

}

const crearUsuario = async(request, res = response)=>{ // la ultima linea de res = response se hace solo parar que aparezcan las ayudas o autocompletados al usar res
    
    const {email, password} = request.body;

        try {

        const existeEmail = await Usuario.findOne({email})

        if(existeEmail){


            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'

            });
        }


        const usuario = new Usuario(request.body)

         //Encryptando contraseña
         const salt = bcrypt.genSaltSync();
         usuario.password = bcrypt.hashSync(password, salt);


        //Guardar usuario
        await usuario.save();


        //Generar Token
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token   // si la propiedad y el valor son iguales se puede poner solo usuario y seria igua lque poner usuario: usuario
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar logs'

        });
        


    }

   

}

const actualizarUsuario = async (req, res = response) => {

    // TODO: validar token y comprobar si es el usuario correcto

    const uid = req.params.id; //con esto obtenemos el id que viene como parametro para actualizar
    


    try {

        const usuarioDB =  await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario con ese id'
            });

        }

         //Actualizaciones

        const {password,google,email,...campos} = req.body; // esa desestructuracion lo que hace es sacar los objetos que se ponen primero del ... campos y de esa manera ya no estan incluidos en el objeto

        if(usuarioDB.email !== email){
          
            const ExisteEmail = await Usuario.findOne({email}); // email: req.body.email esto es lo mismo que solo poner email, al ser lo mismo se puede poenr oslo email y javascript lo reconoce
            if(ExisteEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'

                })

            }

        }

    campos.email = email; // aca se lo estamos regresando el valor

   
   

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos,{new : true});

        

    res.json({
        ok: true,
        usuario: usuarioActualizado
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }

}

const borrarUsuario = async(req, res = response) => {


    const uid = req.params.id;
    

    

    try {

        const usuarioDb = await Usuario.findById(uid);

        if(!usuarioDb){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });

        
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el administrador'
        })
        
    }

}

module.exports={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}