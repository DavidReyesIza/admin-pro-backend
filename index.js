

require('dotenv').config();

const express = require('express');  // esto es como una importacion
const {dbConnection} = require('./database/config')
const cors = require('cors');
// Crear servidor express
const app = express();

// Configurar Cors
app.use( cors() );

//base de datos
dbConnection();

// Rutas
app.get('/',(request, response)=>{

    response.json({
        ok: true,
        msg: 'Hola mundo'
    })

});



app.listen(process.env.PORT, () =>{
    console.log('Servidor Corriendo en puerto '+process.env.PORT);
})