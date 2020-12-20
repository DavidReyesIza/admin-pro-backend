const { response} = require('express');
const Hospital = require('../models/hospital');

const getHospitales=async(req,res=response)=>{

    
    const hospitales = await Hospital.find().populate('usuario','nombre img') //el populate me sirve para buscar un parametro dentro del objeto y mostrarlo



    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital =async(req,res=response)=>{

    const uid = req.uid; //Este dato viene de la validacion del token nosotros podemos pasar datos
    const hospital = new Hospital({ //Esto es para crear el Hospital
        usuario: uid, //Esta desestructuracion hace que se le pueda cambiar un valor y añadirselo de esta manera
        ...req.body}); 

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })
        
    } catch (error) {
        res.status(500).json({

            ok: false,
            msg: 'Hable con el administrador'
        });
    }


 
}

const actualizarHospital=(req,res=response)=>{
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}

const borrarHospital=(req,res=response)=>{
    res.json({
        ok: true,
        msg: 'borrarHospital'
    })
}





module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}