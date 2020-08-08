var express = require('express');
var cors = require('cors'); //Para gestionar politicas de dominios cruzados
var bodyParser = require('body-parser');
var database = require('./modules/database');
var usuariosRouter = require('./routers/usuarios-router');
var planesRouter = require('./routers/planes-router');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/usuarios', usuariosRouter);
app.use('/planes', planesRouter);


app.listen(8888, ()=>{
    console.log('Servidor del backend levantado en 8888');
});