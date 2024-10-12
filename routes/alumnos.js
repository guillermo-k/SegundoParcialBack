var express = require("express");
var router = express.Router();

const { mostrar, mostrarPorLegajo, agregar } = require("../controllers/alumnosController");

//////////////////////////////////////Rutas//////////////////////////////////////

/* Agrega un alumno */
router.get("/agregar", (req, res) => {
  res.render("agregar_alumno");
});

/* Muestra lista de alumnos o alumno en particular si se le pasa su legajo */
router.get("/:legajo?", async (req, res) => {
  const legajo = req.params.legajo;

  const respuesta = legajo ? await mostrarPorLegajo(legajo) : await mostrar();

  if (respuesta) {
    res.render("alumnos", { alumnos: Array.isArray(respuesta) ? respuesta : [respuesta] });
  } else {
    res.sendStatus(400);
  }
});

/* Agrega un alumno y si está bien agregado lo muestra en vista */
router.post("/", async (req, res) => {
  const { body } = req;
  const respuesta = await agregar(body);

  respuesta ? res.redirect(`/alumnos/${respuesta.legajo}`) : res.sendStatus(400);
});

module.exports = router;
