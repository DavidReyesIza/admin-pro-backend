const fs = require('fs');
//Con esto puedo leer las carpetas y los archivos y trabajar con eso

const Usuario = require('../models/usuario')
const Medico = require('../models/medicos')
const Hospital = require('../models/hospital');


const borrarImagen = (path) =>{

    if(fs.existsSync(path)){
        fs.unlinkSync(path); // con esto borramos la imagen anterior
    }

}

const actualizarImagen = async(tipo, id, nombreArchivo) =>{

let pathViejo = '';

    switch (tipo) {

        case 'medicos':

        const medico = await Medico.findById(id);

        if(!medico){
            console.log(' no se encontro un medico con ese id');
            return false;
        }

        pathViejo = `./uploads/medicos/${medico.img}`;
        borrarImagen(pathViejo);
        medico.img= nombreArchivo;
        await medico.save();
        return true;

            
            break;

        case 'hospitales':

            const hospital = await Hospital.findById(id);

            if(!hospital){
                console.log(' no se encontro un hospital con ese id');
                return false;
            }
    
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);
            hospital.img= nombreArchivo;
            await hospital.save();
            return true;
            
            break

        case 'usuarios':

            const usuario = await Usuario.findById(id);

            if(!usuario){
                console.log(' no se encontro un usuario con ese id');
                return false;
            }
    
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            usuario.img= nombreArchivo;
            await usuario.save();
            return true;
            
            break;

            
    
        default:
            break;
    }




}


module.exports = {
    actualizarImagen
}