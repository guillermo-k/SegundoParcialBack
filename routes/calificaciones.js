var express = require("express");
var router = express.Router();
const Calificaciones = require("../controllers/calificacionesController");
const Alumnos = require("../controllers/alumnosController");
const Cursos = require("../controllers/cursosController")


/* API que devuelve notas de un alumno según legajo */
router.get("/api/:legajo", async (req, res) => {
  const { legajo } = req.params;
  const calificacionesAlumno =  await Calificaciones.obtenerCalificacionesPorLegajo(legajo);
  res.json(calificacionesAlumno);
});

/* Muestra los cursos en los que da clases el profesor, y sus materias, para cargar las calificaciones */
router.get("/profesor/:legajo", (req, res) => {
  const { legajo } = req.params;
  const cursosDeProf = Cursos.buscarCursosPorProfesor(parseInt(legajo));
  res.render("seleccionCursoParaCalificaciones", {
    cursosDeProf: cursosDeProf,
    legajoProfe: String(legajo)
  });
});

/* Formulario para carga de calificaciones */
router.get("/form", (req, res) => {
  const { materia, curso, legajo } = req.query;
  const alumnosDelCurso = Alumnos.mostrarPorCursoYMateria(curso, materia);
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

  Calificaciones.cargarCalificacionesAlJSON(calificacionesDelForm);
  res.render("exito", {
    mensaje: "Se guardó correctamente",
    url: `/calificaciones/profesor/${legajo}`
  });
});

module.exports = router;
