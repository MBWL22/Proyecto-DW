var express = require('express');
var router = express.Router();
var artista = require('../models/plan');
var mongoose = require('mongoose');

//Obtener Plan
router.get('/',function (req, res){
    artista.find({},{_id:true, nombrePlan:true})
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});


module.exports = router;
