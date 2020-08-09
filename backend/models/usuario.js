var mongoose = require('mongoose');
var esquema = new mongoose.Schema(
    {
        nombreUsuario: {
            type: String,
            required: true,
            trim: true
        },
        apelidoUsuario: {
            type: String,
            required: true,
            trim: true
        },
        correo:  {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        fechaNacimiento: Date,
        password:{
            type: String,
            required: true,
            trim: true
        },
        plan: Object,
        carpeta: Object
    }
);

module.exports = mongoose.model('usuarios', esquema);