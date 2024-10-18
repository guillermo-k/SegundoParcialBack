var express = require("express");
var router = express.Router();
const calificacionesController = require("../controllers/calificacionesController");
const alumnosController = require("../controllers/alumnosController");

const calificaciones = new calificacionesController();
const alumnos = new alumnosController();

router.get("/api/:legajo", (req, res) => {
  const { legajo } = req.params;
  const calificacionesAlumno = calificaciones.obtenerCalificacionesPorLegajo(legajo);
  res.send(calificacionesAlumno);
});

router.get("/profesor/:legajo", (req, res) => {
  const { legajo } = req.params;
  console.log("legajo en entrada", legajo)
  const cursosDeProf = calificaciones.buscarCursosPorProfesor(parseInt(legajo));
  res.render("seleccionCursoParaCalificaciones", { cursosDeProf: cursosDeProf, legajoProfe: String(legajo) });
});

router.get("/form", (req, res) => {
  const { materia, curso, legajo } = req.query;
  const alumnosDelCurso = alumnos.mostrarPorCursoYMateria(curso, materia);
  res.render("cargarCalificaciones", {
    alumnos: alumnosDelCurso,
    materia: materia,
    legajo: legajo
  });
});

router.post("/cargar", (req, res) => {
  const { legajo } = req.body;
  console.log("req.body en último post", req.body)
  delete req.body.legajo;
  const calificacionesDelForm = req.body;

  calificaciones.cargarCalificacionesAlJSON(calificacionesDelForm);
  res.render("exito", { mensaje: "Se guardó correctamente", url: `/calificaciones/profesor/${legajo}` });
});

module.exports = router;
