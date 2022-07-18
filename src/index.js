const express = require('express');
const app = express();
const morgan = require('morgan');

//settings
app.set('port',process.env.PORT || 3000); // por si hay un puerto en la nube
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev')); // para ver errores y tiempo de respuesta
app.use(express.urlencoded({extended:false})); // para tratar5 de entender datos de formularios textos datos etc
app.use(express.json());//recibe formatos json

//rutas, /api/users, desde carpeta rutas archivo users 
app.use('/api/users',require('./routes/users'));
app.use(require('./routes/index'));

//partida del servert y el puerto donde se ejecuta
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
});