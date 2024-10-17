const fs = require("fs");
const path = require("path");


const calificaciones = require("../database/calificaciones.json")
const cursos = require("../database/cursos.json")

class calificacionesController{
    obtenerCalificacionesPorLegajo(legajo){
        try {
            return calificaciones.filter(it=>it.legajo == legajo)
            
        } catch (error) {
            throw error
        }
    }

    obtenerCalificacionesPorMateria(materia){
        return calificaciones.filter(it=>it.materia == materia)
    }

    buscarCursosPorProfesor(legajo){
        const cursosDeProf = cursos.filter(it => it.profesores.includes(legajo))
        return cursosDeProf
    }


    cargarCalificacionesAlJSON(algo){
        const materia = algo.materia
        delete algo.materia
        for (const [legajo, calificacion] of Object.entries(algo)) {
            calificaciones.find(it=> it.materia == materia && it.legajo == legajo).calificacion = calificacion
          }

        const filePath = path.join(__dirname, "../database/calificaciones.json");
        fs.writeFileSync(filePath, JSON.stringify(calificaciones, null, 2), "utf-8");
    }

    borrarCalificacionesDeJsonPorLegajo(legajo){
        const newCalificaciones = calificaciones.filter(it=> it.legajo != legajo)
        console.log(newCalificaciones)
        const filePath = path.join(__dirname, "../database/calificaciones.json");
        fs.writeFileSync(filePath, JSON.stringify(newCalificaciones, null, 2), "utf-8");
    }
}


module.exports = calificacionesController;