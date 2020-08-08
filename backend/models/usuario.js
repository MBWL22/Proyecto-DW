var mongoose = require('mongoose');
var esquema = new mongoose.Schema(
    {
        nombreUsuario: String,
        apelidoUsuario: String,
        correo: String,
        fechaNacimiento: Date,
        password: String,
        plan: Object,
        carpeta: Object
    }
);

module.exports = mongoose.model('usuarios', esquema);