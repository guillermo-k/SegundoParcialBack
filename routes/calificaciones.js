var express = require("express");
var router = express.Router();

const calificaciones = require("../database/calificaciones.json");

router.get("/:alumno?", (req, res) => {
  res.render("calificaciones", { title: "Calificaciones", cualca: "otra cosa" });
});

/* get todas
get de cada alumno
post (solo acceso profes) */

module.exports = router;
