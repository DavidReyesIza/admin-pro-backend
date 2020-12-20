const {response} =require('express');
const Medico = require('../models/medicos');

const getMedicos = async(req , res = response) =>{

    const medicos = await Medico.find().populate('usuario','nombre').populate('hospital','nombre')

    res.json({
        ok: true,
       medicos
    });

}

const crearMedico = async(req , res = response) =>{

    const uid = req.uid;
    console.log(uid);

    const medico = new Medico({usuario:uid,...req.body})

    try {

       const newMedico = await medico.save();

        res.json({
            ok: true,
            medico: newMedico
        });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
        
    }


  

}

const actualizarMedico = (req , res = response) =>{

    res.json({
        ok: true,
        msg: 'Actualizar medico'
    });

}

const borrarMedico = (req , res = response) =>{

    res.json({
        ok: true,
        msg: 'Borrar medico'
    })

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}



