const usuarios = require("../database/usuarios.json");

  function buscarPorLegajo(legajo) {
    return usuarios.find(usuario => usuario.legajo == legajo);
  }

  function autentificarUsuario(req, res, next) {
    const { legajo, pass } = req.body;
    const usuario = buscarPorLegajo(legajo);
    if(usuario.contraseña == pass){
      req.rol = usuario.rol
      next()
    }
    else{res.send("Credenciales incorrectas")}
    
  }


module.exports = autentificarUsuario;
