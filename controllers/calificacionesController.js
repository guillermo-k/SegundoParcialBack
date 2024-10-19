const fs = require("fs");
const path = require("path");

let calificaciones = require("../database/calificaciones.json");
const cursos = require("../database/cursos.json");

class calificacionesController {
  obtenerCalificacionesPorLegajo(legajo) {
    try {
      return calificaciones.filter(it => it.legajo == legajo);
    } catch (error) {
      throw error;
    }
  }
  /// Por ahora en desuso
  obtenerCalificacionesPorMateria(materia) {
    return calificaciones.filter(it => it.materia == materia);
  }

  buscarCursosPorProfesor(legajo) {
    const cursosDeProf = cursos.filter(it => it.profesores.includes(legajo));
    return cursosDeProf;
  }

  cargarCalificacionesAlJSON(datosAlumno) {
    const materia = datosAlumno.materia;
    delete datosAlumno.materia;
    for (const [legajo, calificacion] of Object.entries(datosAlumno)) {
      calificaciones.find(it => it.materia == materia && it.legajo == legajo).calificacion =
        calificacion;
    }

    const filePath = path.join(__dirname, "../database/calificaciones.json");
    fs.writeFileSync(filePath, JSON.stringify(calificaciones, null, 2), "utf-8");
  }

  borrarCalificacionesDeJsonPorLegajo(legajo) {
    calificaciones = calificaciones.filter(it => it.legajo != legajo);
    const filePath = path.join(__dirname, "../database/calificaciones.json");
    fs.writeFileSync(filePath, JSON.stringify(calificaciones, null, 2), "utf-8");
  }
}

module.exports = calificacionesController;
