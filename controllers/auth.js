const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

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


module.exports = {
    login
}