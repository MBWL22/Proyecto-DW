var mongoose = require('mongoose');
var esquema = new mongoose.Schema(
    {
        nombreArchvivo: String,
        lenguaje: String,
        extension: String,
        fechaCreacion: Date,
        lineas: Array //o json dependera como se guarden
    }
);

module.exports = mongoose.model('archivos', esquema);