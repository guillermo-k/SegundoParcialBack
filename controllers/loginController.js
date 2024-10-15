const usuarios = require("../database/usuarios.json");

class login {
  buscarPorLegajo(legajo) {
    return usuarios.find(usuario => usuario.legajo == legajo);
  }

  autentificarUsuario(legajo, pass) {
    const usuario = this.buscarPorLegajo(legajo);
    const rol = usuario.contraseña == pass ? usuario.rol : null;
    return rol;
  }
}

module.exports = login;
