var express = require("express");
var router = express.Router();
const calificacionesController = require("../controllers/calificacionesController");
const alumnosController = require("../controllers/alumnosController");

const calificaciones = new calificacionesController();
const alumnos = new alumnosController();

// router.get("/:alumno?", (req, res) => {
//   res.render("calificaciones", { title: "Calificaciones", cualca: "otra cosa" });
// });

/* get todas
get de cada alumno
post (solo acceso profes) */

router.get("/api/:legajo", (req, res) => {
  const { legajo } = req.params;
  const calificacionesAlumno = calificaciones.obtenerCalificacionesPorLegajo(legajo);
  res.send(calificacionesAlumno);
});


router.get("/profesor/:legajo", (req, res)=>{
    const {legajo} = req.params
    const cursosDeProf = calificaciones.buscarCursosPorProfesor(parseInt(legajo))
    res.render("seleccionCursoParaCalificaciones",{cursosDeProf:cursosDeProf})
})

router.get("/form", (req,res)=>{
    const {materia, curso} = req.query
    const alumnosDelCurso = alumnos.mostrarPorCursoYMateria(curso,materia)
    res.render("cargarCalificaciones",{alumnos:alumnosDelCurso,materia:materia})
})

router.post("/cargar", (req,res)=>{
  const calificacionesDelForm = req.body
  calificaciones.cargarCalificacionesAlJSON(calificacionesDelForm)
  res.render("exito",{mensaje:"Se guardó correctamente"})
})


module.exports = router;
