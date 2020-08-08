var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var mongoose = require('mongoose');

//Obtener un usuario
router.get('/:idUsuario', function(req,res){
    usuario.find({correo:req.params.correo}).then(result=>{
        res.send(result[0]);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});


//Crear un usuario
router.post('/', function(req, res){
    let u = new usuario(
        {
            nombreUsuario: req.body.nombreUsuario,
            apelidoUsuario: req.body.apelidoUsuario,
            email: req.body.email,
            fechaNacimiento: req.body.fechaNacimiento,
            password: req.body.password,
            plan: req.body.plan,
            carpeta: {
               _id :mongoose.Types.ObjectId(),
               nombreCarpeta:  "repositorio",
               contenido: []
            }  
        }
    );
    u.save().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Actualizar un usuario
router.put('/:idUsuario',function(req, res){
    usuario.update(
        {
            _id:req.params.idUsuario
        },
        {
            nombreUsuario: req.body.nombreUsuario,
            apelidoUsuario: req.body.apelidoUsuario,
            email: req.body.email,
            fechaNacimiento: req.body.fechaNacimiento,
            password: req.body.password,
            plan: req.body.plan
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Obtener la carpeta principal del usuario
//http://localhost/usuarios/123/repositorio
router.get('/:idUsuario/carpeta',function (req, res){
    usuario.find(
        {
            _id: req.params.idUsuario
        },
        {"carpeta":true})
    .then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Obtener carpeta y sus archivos
//http://localhost/usuarios/123/repositorio/3
router.get('/:idUsuario/carpeta/:idCarpeta',function (req, res){
    usuario.find(
        {
            _id: req.params.idUsuario,
            "carpeta._id" : mongoose.Types.ObjectId(req.params.idCarpeta)
        },
        {"carpeta.$":true})
    .then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});



//Guardar archivo en carpeta
router.post('/:idUsuario/carpeta/:idCarpeta/', function (req, res){
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario),
            "carpeta._id":mongoose.Types.ObjectId(req.params.idCarpeta)
        },
        {
            $push:{
                "carpeta.$.contenido":{
                    nombreArchivo:req.body.nombreArchivo,
                    lenguaje:req.body.lenguaje,
                    lineas:req.body.lineas,
                    fechaCreacion:req.body.fechaCreacion,
                    fechaModificacion: req.body.fechaModificacion,
                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});


//Crear una nueva carpeta 
router.post('/:idUsuario/carpeta/:idCarpeta', function (req, res){
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario),
            "carpeta._id":mongoose.Types.ObjectId(req.params.idCarpeta)
        },
        {
            $push:{
                repositorio:{
                    _id: mongoose.Types.ObjectId(),
                    nombreCarpeta: req.body.nombreCarpeta,
                    contenido: []
                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
    
});


module.exports = router;
