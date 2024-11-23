const jwt = require('jsonwebtoken');

function autorizar(rolesPermitidos) {
    return (req, res, next) => {
      try {
        const token = req.cookies.token
        if (!token) return res.status(401).json({ mensaje: 'No autorizado' });
  
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.usuario = decoded; // Añadimos el usuario decodificado a la request
  
        // Verificar si el rol del usuario está permitido
        if (!rolesPermitidos.includes(decoded.rol)) {
          return res.status(403).json({ mensaje: 'Acceso denegado' });
        }
        
        if(decoded.rol == "alumno/padre"){
            req.params = {legajo:decoded.legajo}
        }
        next(); // Permitir acceso al siguiente middleware/controlador
      } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido o expirado' });
      }
    };
  }

  module.exports = autorizar;