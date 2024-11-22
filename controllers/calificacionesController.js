const fs = require("fs");
const path = require("path");
const Calificacion = require("../models/calificacion")

let calificaciones = require("../database/calificaciones.json");

class calificacionesController {

  
  static async obtenerCalificacionesPorLegajo(legajo) {
    try {
      return await Calificacion.find({legajo:legajo})
    } catch (error) {
      throw error;
    }
  }


  static async cargarCalificacionesDB(datosAlumno) {
    const materia = datosAlumno.materia;
    delete datosAlumno.materia;
    for (const [legajo, calificacion] of Object.entries(datosAlumno)) {
     await Calificacion.updateOne({materia:materia, legajo:legajo}, {calificacion:calificacion})
      /* calificaciones.find(it => it.materia == materia && it.legajo == legajo).calificacion =
        calificacion; */
    }
  }

  static borrarCalificacionesDeJsonPorLegajo(legajo) {
    calificaciones = calificaciones.filter(it => it.legajo != legajo);
    this.actualizarJson(calificaciones)
  }

  static crearCalificacionesVacias(datos){
    datos.materias.forEach(materia => {
      calificaciones.push({
        "legajo": datos.legajo,
        "materia": materia,
        "calificacion": ""
      })
    });
    this.actualizarJson(calificaciones)
  }

  static actualizarJson(datos){
    const filePath = path.join(__dirname, "../database/calificaciones.json");
    fs.writeFileSync(filePath, JSON.stringify(datos, null, 2), "utf-8");
  }

  /// Por ahora en desuso
  /* obtenerCalificacionesPorMateria(materia) {
    return calificaciones.filter(it => it.materia == materia);
  } */

    static async buscarCalificacionLegajoMateria(legajo, materia){
      try {
        return await Calificacion.find({legajo:legajo, materia:materia})
       
      } catch (error) {
        throw error;
      }
    }
}

module.exports = calificacionesController;
