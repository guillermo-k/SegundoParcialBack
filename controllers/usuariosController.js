const Usuario = require("../models/Usuario");

class usuariosController{
    static async borrarUsuario(legajo){
        await Usuario.deleteOne({legajo:legajo})
    }

    static async getUsuario(legajo){
        return await Usuario.findOne({legajo:legajo})
    }

    static async agregarUsuario(usuario){
        const newUsuario = new Usuario(usuario);
        await newUsuario.save()
    }

    static async getUsuarios(){
        return await Usuario.find();
    }
}

module.exports = usuariosController;