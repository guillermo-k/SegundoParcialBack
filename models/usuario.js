const mongoose = require('mongoose'); 


const usuarioSchema = new mongoose.Schema({
    legajo: {type: Number ,require : true},
    contraseña: {type: String,require : true},
    rol: {type: String, enum:["alumno/padre","profesor","administrador"] ,require : true}
})

const Usuario = mongoose.model("Usuario",usuarioSchema);

module.exports = Usuario;