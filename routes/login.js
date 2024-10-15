var express = require("express");
var router = express.Router();

const loginController = require("../controllers/loginControler");
const login = new loginController();

router.post("/", (req, res) => {
  const { legajo, pass } = req.body;
  const rol = login.autentificarUsuario(legajo, pass);
  switch (rol) {
    case "alumno/padre":
      res.redirect("/alumnos/" + legajo);
      break;
    case "profesor":
      res.redirect("/calificaciones");
      break;
    case "administrador":
      res.redirect("/panelAdministrador");
      break;
    default:
      res.send("Credenciales incorrectas");
      break;
  }
});

module.exports = router;
