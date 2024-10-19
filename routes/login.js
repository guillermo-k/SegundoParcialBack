var express = require("express");
var router = express.Router();

const autenticacion = require("../middleware/autenticacion");

/* Ruta POST de redireccionamiento según Login */
router.post("/", autenticacion, (req, res) => {
  switch (req.rol) {
    case "alumno/padre":
      res.redirect("/alumnos/" + req.body.legajo);
      break;
    case "profesor":
      res.redirect(`/calificaciones/profesor/${req.body.legajo}`);
      break;
    case "administrador":
      res.redirect("/alumnos/agregar");
      break;
    default:
      res.send("Rol no identificado");
      break;
  }
});

module.exports = router;
