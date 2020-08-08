var mongoose = require('mongoose');
var esquema = new mongoose.Schema(
    {
        nombrePlan: String,
        limite: String,
        precio: String,
        fechaCreacion: Date,
    }
);

module.exports = mongoose.model('planes', esquema);