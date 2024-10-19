var express = require("express");
var router = express.Router();
const calificacionesController = require("../controllers/calificacionesController");
const alumnosController = require("../controllers/alumnosController");

const calificaciones = new calificacionesController();
const alumnos = new alumnosController();

/* API que devuelve notas de un alumno según legajo */
router.get("/api/:legajo", (req, res) => {
  const { legajo } = req.params;
  const calificacionesAlumno = calificaciones.obtenerCalificacionesPorLegajo(legajo);
  res.json(calificacionesAlumno);
});

/* Muestra los cursos en los que da clases el profesor, y sus materias, para cargar las calificaciones */
router.get("/profesor/:legajo", (req, res) => {
  const { legajo } = req.params;
  const cursosDeProf = calificaciones.buscarCursosPorProfesor(parseInt(legajo));
  res.render("seleccionCursoParaCalificaciones", {
    cursosDeProf: cursosDeProf,
    legajoProfe: String(legajo)
  });
});

/* Formulario para carga de calificaciones */
router.get("/form", (req, res) => {
  const { materia, curso, legajo } = req.query;
  const alumnosDelCurso = alumnos.mostrarPorCursoYMateria(curso, materia);
  res.render("cargarCalificaciones", {
    alumnos: alumnosDelCurso,
    materia: materia,
    legajo: legajo,
    curso: curso
  });
});

/* Ruta POST para guardado de calificaciones */
router.post("/cargar", (req, res) => {
  const { legajo } = req.body;
  delete req.body.legajo;
  const calificacionesDelForm = req.body;

  calificaciones.cargarCalificacionesAlJSON(calificacionesDelForm);
  res.render("exito", {
    mensaje: "Se guardó correctamente",
    url: `/calificaciones/profesor/${legajo}`
  });
});

module.exports = router;
