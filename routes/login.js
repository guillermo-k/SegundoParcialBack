var express = require("express");
var router = express.Router();

const login = require("../middleware/autenticacion");
// const login = new loginController();

router.post("/", login, (req, res) => {
//   const { legajo, pass } = req.body;
//   const rol = login.autentificarUsuario(legajo, pass);
    // const {rol} = req;  
  switch (req.rol) {
    case "alumno/padre":
        console.log("Entro al case")
        res.redirect("/alumnos/" + req.body.legajo);
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
