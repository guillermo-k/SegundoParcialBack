const usuarios = require("../database/usuarios.json");

function buscarPorLegajo(legajo) {
  return usuarios.find(usuario => usuario.legajo == legajo);
}

/*   Middleware para identificar qué tipo de rol tiene el usuario y redireccionarlo acorde en la función siguiente */
function autenticarUsuario(req, res, next) {
  const { legajo, pass } = req.body;
  const usuario = buscarPorLegajo(legajo);
  if (usuario && usuario.contraseña == pass) {
    req.rol = usuario.rol;
    next();
  } else {
    res.send("Credenciales incorrectas");
  }
}

module.exports = autenticarUsuario;
