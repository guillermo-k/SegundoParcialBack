const fs = require("fs");
const path = require("path");
let usuarios = require("../database/usuarios.json");

class usuariosController{
    static borrarUsuario(legajo){
        usuarios = usuarios.filter(it => it.legajo != legajo);
        this.actualizarJson(usuarios)
    }

    static getUsuario(legajo){
        return usuarios.find(usuario=> usuario.legajo == legajo)
    }

    static agregarUsuario(usuario){
        usuarios.push(usuario)
        this.actualizarJson(usuarios)
    }


    static actualizarJson(usuarios){
        const filePathUsuarios = path.join(__dirname, "../database/usuarios.json");
        fs.writeFileSync(filePathUsuarios, JSON.stringify(usuarios, null, 2), "utf-8");
    }
}

module.exports = usuariosController;