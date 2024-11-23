/* const Usuarios = require("../controllers/usuariosController") */
const Usuario = require("../models/Usuario");
const jwt = require('jsonwebtoken');

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

    res.cookie('token', generarToken(usuario), {
    
      httpOnly: true,     // Esto hace que la cookie no sea accesible desde JavaScript (mejor seguridad)
      //secure: process.env.NODE_ENV === 'production',  // Si estás en producción, usa "secure" (requiere HTTPS)
      maxAge: 3600000,    // Tiempo de expiración de la cookie (en milisegundos, 1 hora en este caso)
      sameSite: 'strict'  // Mejora la seguridad al prevenir que la cookie se envíe en solicitudes de otros sitios
    });

    // Agregar el rol al objeto req para usarlo en las rutas siguientes
    req.rol = usuario.rol;
    next();
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}
function generarToken(usuario) {
  const payload = {
    legajo: usuario.legajo,
    rol: usuario.rol, // alumno/padre, profesor, administrador
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }); // Cambia el secreto por una variable de entorno
  return token;
}

module.exports = autenticarUsuario;
