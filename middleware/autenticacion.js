/* const Usuarios = require("../controllers/usuariosController") */
const Usuario = require("../models/Usuario")


/* *************FUNCIÓN VIEJA SIN DESHASHEO************ */

/*   Middleware para identificar qué tipo de rol tiene el usuario y redireccionarlo acorde en la función siguiente */
/* async function autenticarUsuario(req, res, next) {
  const { legajo, pass } = req.body;
  const usuario = await Usuario.findOne({legajo:legajo})
  if (usuario && usuario.contraseña == pass) {
    req.rol = usuario.rol;
    next();
  } else {
    res.send("Credenciales incorrectas");
  }
}

module.exports = autenticarUsuario; */

/* ******************************************************** */


// Middleware para autenticar al usuario
async function autenticarUsuario(req, res, next) {
  const { legajo, pass } = req.body;

  try {
    const usuario = await Usuario.findOne({ legajo: legajo });
    if (!usuario) {
      return res.status(401).send("Credenciales incorrectas: Usuario no encontrado");
    }

    // Usar el método comparePassword para verificar la contraseña
    const esValida = await usuario.comparePassword(pass);
    if (!esValida) {
      return res.status(401).send("Credenciales incorrectas: Contraseña incorrecta");
    }

    // Agregar el rol al objeto req para usarlo en las rutas siguientes
    req.rol = usuario.rol;
    next();
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}

module.exports = autenticarUsuario;