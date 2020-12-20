const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req,res = response) => {

    const {email, password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});
        //console.log('Este es el usuario encontrado '+usuarioDB)

        //Verificando Email
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //Verificando contraseña

        const validPassword = bcrypt.compareSync(password,usuarioDB.password)
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña Invalida'

            });
        }

        //Generar el token -JSON WEB TOKEN -JWT

        const token = await generarJWT(usuarioDB.id);


        
        res.json({
            ok: true,
            token

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

}

const googleSignIn = async(req, res=response) =>{

    const googleToken = req.body.token;

    try {

        const {name,email,picture} = await googleVerify(googleToken);

        // Verificar que el email no exista

        const usuarioDb = await Usuario.findOne({email});
        let usuario;
        if(!usuarioDb){

            // Esto es si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });

        }else{
            // Existe usuario
            usuario = usuarioDb;
            usuarioDb.google = true;
           // usuario.password = '@@@'; Esto lo podemos hacer por si el usuario ahora quiere usar cuenta google entonces se le cambia la contraseña anterior y se le pone esa para que solo use la de google
        }

        //Guardar en DB

        await usuario.save();
         
        //Generar el TOKEN - JWT
        const token = await generarJWT(usuario.id);

        
        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);

        res.status(401).json({
            ok: false,
            msg: 'El token no es correcto'
           
        })
        
    }

}


module.exports = {
    login,
    googleSignIn
}