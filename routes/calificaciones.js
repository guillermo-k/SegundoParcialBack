var express = require("express");
var router = express.Router();
const calificacionesController = require("../controllers/calificacionesController")

const calificaciones = new calificacionesController

router.get("/:alumno?", (req, res) => {
  res.render("calificaciones", { title: "Calificaciones", cualca: "otra cosa" });
});

/* get todas
get de cada alumno
post (solo acceso profes) */

router.get("/api/:legajo",(req, res)=>{
  const {legajo} = req.params
  const calificacionesAlumno = calificaciones.obtenerCalificaciones(legajo)
  res.send(calificacionesAlumno);
})



module.exports = router;
