

require('dotenv').config();

const express = require('express');  // esto es como una importacion
const {dbConnection} = require('./database/config')
const cors = require('cors');
// Crear servidor express
const app = express();

// Configurar Cors es un middleware
app.use( cors() );

// Lectura o parseo  del body tambien es un middleware
app.use(express.json());

//base de datos
dbConnection();

//Directorio Publico
app.use(express.static('public'))

// Rutas

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/todo',require('./routes/busquedas'));
app.use('/api/upload',require('./routes/uploads'));
app.use('/api/login',require('./routes/auth'));





app.listen(process.env.PORT, () =>{
    console.log('Servidor Corriendo en puerto '+process.env.PORT);
})