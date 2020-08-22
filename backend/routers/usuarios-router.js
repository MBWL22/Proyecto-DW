var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey123456';

//Login de un usuario
router.post('/login', function(req,res){
    const userData = {
        correo: req.body.correo,
        password: req.body.password
    }
    usuario.findOne({ correo: userData.correo }, (err, user) => {
        if (err) return res.status(500).send('Server error!');
    
        if (!user) {
          // email does not exist
          res.status(409).send({ message: 'El correo no existe' });
        } else {
          const resultPassword = bcrypt.compareSync(userData.password, user.password);
          if (resultPassword) {
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
    
            const dataUser = {
              id: user.id,
              correo: user.correo,
              accessToken: accessToken,
              expiresIn: expiresIn
            }
            res.send({ dataUser });
          } else {
            // password wrong
            res.status(409).send({ message: 'Contrasena invalida' });
          }
        }
      });
});


//Registro de usuario con clave encriptada y expiracion de secion
router.post('/', function(req, res){
    let u = new usuario(
        {
            nombreUsuario: req.body.nombreUsuario,
            apelidoUsuario: req.body.apelidoUsuario,
            correo: req.body.correo,
            fechaNacimiento: req.body.fechaNacimiento,
            password: bcrypt.hashSync(req.body.password),
            plan: req.body.plan,
            carpeta: {
               _id :mongoose.Types.ObjectId(),
               nombreCarpeta:  "repositorio",
               contenido: []
            }  
        }
    );
    u.save().then(user=>{
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
        SECRET_KEY, {
            expiresIn: expiresIn
        });
        const dataUser = {
        nombreUsuario: user.nombreUsuario,
        apelidoUsuario:user.apelidoUsuario,
        correo: user.correo,
        accessToken: accessToken,
        expiresIn: expiresIn
        }
        // response 
        res.send({ dataUser });
        res.end();
    }).catch(error=>{
        if (error && error.code === 11000){
            res.status(409).send('El correo ya existe');
            res.end();
        } else if (error){
            res.status(500).send('Server error');
            res.end();
        } 
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
            correo: req.body.correo,
            fechaNacimiento: req.body.fechaNacimiento,
            password: bcrypt.hashSync(req.body.password),
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
