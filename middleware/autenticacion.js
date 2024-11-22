/* const Usuarios = require("../controllers/usuariosController") */
const Usuario = require("../models/Usuario")


/*   Middleware para identificar qué tipo de rol tiene el usuario y redireccionarlo acorde en la función siguiente */
async function autenticarUsuario(req, res, next) {
  const { legajo, pass } = req.body;
  const usuario = await Usuario.findOne({legajo:legajo})
  if (usuario && usuario.contraseña == pass) {
    req.rol = usuario.rol;
    next();
  } else {
    res.send("Credenciales incorrectas");
  }
}

module.exports = autenticarUsuario;
