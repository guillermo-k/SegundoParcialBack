var express = require("express");
var router = express.Router();
const alumnosController = require("../controllers/alumnosController")
const Alumnos = new alumnosController


//////////////////////////////////////Rutas//////////////////////////////////////

// Borrado de un alumno por legajo
router.delete("/:legajo", async (req, res) => {
  const {legajo} = req.params;
  const respuesta = await Alumnos.borrar(legajo);
  respuesta? res.status(200).render("exito",{mensaje: respuesta, url:"/alumnos/"}): res.status(400).render("error",{mensaje:"Alumno no encontrado"})
});


/* Agrega un alumno */
router.get("/agregar", (req, res) => {
  res.render("agregar_alumno");
});

/* Muestra lista de alumnos o alumno en particular si se le pasa su legajo */
router.get("/:legajo?", async (req, res) => {
  const {legajo} = req.params

  const respuesta = legajo ? await Alumnos.mostrarPorLegajo(legajo) : await Alumnos.mostrar();
  if (respuesta) {
    res.render("alumnos", { alumnos: Array.isArray(respuesta) ? respuesta : [respuesta] });
  } else {
    res.status(400).render("error", { mensaje: "El legajo ingresado no existe" });
  }
});

/* Agrega un alumno y si está bien agregado lo muestra en vista */
router.post("/", async (req, res) => {
  const respuesta = await Alumnos.agregar(req.body);

  respuesta ? res.redirect(`/alumnos/${respuesta.legajo}`) : res.sendStatus(400);
});




module.exports = router;
