var express = require("express");
var router = express.Router();
const Alumnos = require("../controllers/alumnosController");
const autorizacion = require("../middleware/autorizacion");

//////////////////////////////////////Rutas//////////////////////////////////////

// API Borrado de un alumno por legajo
router.delete("/:legajo", autorizacion(["administrador"]), async (req, res) => {
  const { legajo } = req.params;
  const respuesta = await Alumnos.borrar(legajo);
  respuesta
    ? res.status(200).render("exito", { mensaje: respuesta, url: "/alumnos/" })
    : res.status(400).render("error", { mensaje: "Alumno no encontrado" });
});

/* Agrega un alumno (ingreso administrador) */
router.get("/agregar",autorizacion(["administrador"]), (req, res) => {
  res.render("agregar_alumno");
});

/* Muestra lista de alumnos o alumno en particular según si se le pasa legajo por parámetro */
router.get("/:legajo?",autorizacion(["administrador","profesor","alumno/padre"]), async (req, res) => {
  const { legajo } = req.params;

  const respuesta = legajo ? await Alumnos.mostrarPorLegajo(legajo) : await Alumnos.mostrar();
  if (respuesta) {
    res.render("alumnos", { alumnos: Array.isArray(respuesta) ? respuesta : [respuesta] });
  } else {
    res.status(400).render("error", { mensaje: "El legajo ingresado no existe" });
  }
});

/* Agrega un alumno y si está bien agregado lo muestra en vista */
router.post("/", autorizacion(["administrador"]), async (req, res) => {
  const respuesta = await Alumnos.agregar(req.body);
  respuesta ? res.redirect(`/alumnos/${respuesta.legajo}`) : res.sendStatus(400);
});




module.exports = router;
