// getTodo

const { response } = require("express")
const Usuario = require('../models/usuario')
const Medico = require('../models/medicos')
const Hospital = require('../models/hospital')
const getTodo = async(req, res=response)=>{

    
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i'); //Esto es una expresion regular y la 'i' lo que hace es volver insensible la busqueda para que aparezcan todas las coincidencias en la busqueda

/*     const usuarios = await Usuario.find({nombre: regex});
    const medicos = await Medico.find({nombre: regex});
    const hospitales = await Hospital.find({nombre: regex}); */ // Esto no lo hacemos asi por que tiene 3 peticiones asincronas consecutivas y optamos hacer lo de la linea de abajo

    const[usuarios,medicos,hospitales ] = await Promise.all([ // en la desdestructuracion obtenemos las respuestas de cada uno de forma consecutiva
         Usuario.find({nombre: regex}),
         Medico.find({nombre: regex}),
         Hospital.find({nombre: regex}),
    ]);



    

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })

}


const getDocumentosColeccion = async(req, res=response)=>{

    
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i'); //Esto es una expresion regular y la 'i' lo que hace es volver insensible la busqueda para que aparezcan todas las coincidencias en la busqueda

    let data = [];

    switch (tabla) {
        case 'medicos':
         data = await  Medico.find({nombre: regex})
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');
            
            break;


        case 'hospitales':

          data = await  Hospital.find({nombre: regex})
                                .populate('usuario','nombre img');
            
            break;



        case 'usuarios':
           data = await  Usuario.find({nombre: regex});
            
            break;
            
    
        default:
          return  res.status(400).json({
                ok: false,
                msg: 'la tabla tiene que ser usuarios/medicos/hospitales'
            });

           
    }


    res.json({
        ok: true,
        resultados: data
    });

}



module.exports ={
    getTodo,
    getDocumentosColeccion
}