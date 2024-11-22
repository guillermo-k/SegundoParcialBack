const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');


const usuarioSchema = new mongoose.Schema({
    legajo: {type: Number ,require : true},
    contraseña: {type: String,require : true},
    rol: {type: String, enum:["alumno/padre","profesor","administrador"] ,require : true}
});

// Hash de contraseñas antes de guardar
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('contraseña')) return next();
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
    next();
  }); 
  
  // Comparar contraseñas
   usuarioSchema.methods.comparePassword = async function (contraseña) {
    return bcrypt.compare(contraseña, this.contraseña);
  };
  

const Usuario = mongoose.model("Usuario",usuarioSchema);

module.exports = Usuario;