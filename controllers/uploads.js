const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const fs = require('fs');

// ayuda para construir un path completo y lo usamos para bajar la imagen y mostrarla al cliente
const path = require('path');


// Para subir archivos utilizamos la libreria npm i express-fileupload
const fileUpload = (req, res =response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;


    // Validando tipos
    const tiposValidos = ['hospitales','medicos','usuarios'];

    if(!tiposValidos.includes(tipo)){ // Esto valida que el tipo que viene por parametro sea uno de los que definimos como validos
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico un usuario u hospital'
        })
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) { // esto es de la libreria que instalamos y verifica que haya archivos
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
      }

      //Procesar la imagen...

      const file = req.files.imagen; // el nombre imagen tiene que ser el mismo que enviamos del frontend o postman y tenemos acceso a los files gracias al middleware que instalamos de la libreria en los routes

      const nombreCortado = file.name.split('.') // esto hace por ejemplo wolverine.1.3.jpg y gracias a esto lo divide en partes el string y asi podemos acceder a la ultima parte del archivo que es la extension
      const extensionArchivo = nombreCortado[nombreCortado.length - 1]; // gracias a esto accedemos a la ultima posicion del arreglo que contiene la extension

      // Validar extension
      const extensionesValidas = ['png','jpg','jpeg','gif'];
      if(!extensionesValidas.includes(extensionArchivo)){
      return res.status(400).json({
          ok: false,
          msg: 'No es una extension permitida'
      });
      }

      //Generar el nombre del archivo
      // para esto se utilizara npm install uuid para que cada imagen tenga un nombre unico

      const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

      //Path para guardar la imagen
      const path = `./uploads/${tipo}/${nombreArchivo}`;

       // Use the mv() method to place the file somewhere on your server
       // usar mv para mover la imagen a donde nosotros queramos

  file.mv(path, (err)=> {
    if (err){
        console.log(err)
        return res.status(500).json({
            ok: false,
            msg: 'Error al mover la imagen'
        });
    }

    // Actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo);
        
    res.json({
        ok: true,
        msg: 'Archivo subido',
        nombreArchivo
    });
  });



   
}

const retornaImagen = (req, res = response) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;


    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}`);

    // Regresar una imagen vacia si no tiene imagen
    // Default image

    if(fs.existsSync(pathImg)){

        res.sendFile(pathImg); // Esto le dice a express que responda un archivo y uno un json

    }else{
        
        const pathImg = path.join( __dirname, `../uploads/no-img.png`);
        res.sendFile(pathImg); // Esto le dice a express que responda un archivo y uno un json

    }

}


module.exports = {
    fileUpload,
    retornaImagen
}