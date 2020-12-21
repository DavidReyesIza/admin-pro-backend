const {response} =require('express');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');

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

const actualizarMedico = async(req , res = response) =>{

    const medicoId = req.params.id;
    const hospitalId= req.body.hospital;
    const uid = req.iud;
    

    try {


        const hospital = await Hospital.findById(hospitalId);

        if(!hospital){
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado',
                
            });

        }


        const medico = await Medico.findById(medicoId);

        if(!medico){
            return res.status(404).json({
                ok:true,
                msg: 'Medico no encontrado'
            });
        }



        const cambiosMedico={
        ...req.body,
        usuario:uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(medicoId,cambiosMedico,{ new: true});

        res.json({
            ok: true,
            msg: 'Medico actualizado',
            medicoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

}

const borrarMedico = async(req , res = response) =>{

    const medicoId= req.params.id;


    try {

        const medico = await Medico.findById(medicoId)
        if(!medico){
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado',
            });
        }

        await Medico.findByIdAndDelete(medicoId);

        res.json({
            ok: true,
            msg:'medico eliminado'
        })
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg:'Contacte al administrador'
        })

        
    }


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



