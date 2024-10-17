const usuarios = require("../database/usuarios.json");

  function buscarPorLegajo(legajo) {
    return usuarios.find(usuario => usuario.legajo == legajo);
  }

  function autenticarUsuario(req, res, next) {
    const { legajo, pass } = req.body;
    const usuario = buscarPorLegajo(legajo);
    if(usuario && usuario.contraseña == pass){
      req.rol = usuario.rol
      next()
    }
    else{res.send("Credenciales incorrectas")}
    
  }


module.exports = autenticarUsuario;
