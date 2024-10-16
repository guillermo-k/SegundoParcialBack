const fs = require("fs");
const path = require("path");
const cursos = require("../database/cursos.json")
const alumnos = require("../database/alumnos.json");
const usuarios = require("../database/usuarios.json")
const calificacionesJSON = require("../database/calificaciones.json")
const calificacionesController = require("./calificacionesController");

const calificaciones = new calificacionesController


class alumnosController {
  // Metodo para mostrar todos los alumnos
  mostrar() {
    try {
        alumnos.map(element => {
        element.materias = calificaciones.obtenerCalificaciones(element.legajo)
      });
      return alumnos;
    } catch (error) {
      throw error;
    }
  }

  // Metodo para mostrar un alumno por su legajo
  mostrarPorLegajo(legajo) {
    try {
      const alumno = alumnos.find(alumno => alumno.legajo == legajo);
      alumno.materias = calificaciones.obtenerCalificaciones(alumno.legajo)
      return alumno;
    } catch (error) {
      throw error;
    }
  }

  // Metodo para agregar un nuevo alumno
  agregar(body) {
    try {
      const { nombre, curso, padre_madre, contraseña } = body;

      if (nombre && curso && padre_madre && contraseña) {
        ////Generación de número de legajo
        const legajo = Math.max(...alumnos.map(alumno => alumno.legajo)) + 1;


        // Buscar materias según curso
        const materias = cursos.find((item) => item.curso == curso).materias


        // Convierte las materias (que vienen del form de la vista) en array
        // const materiasArray = materias.split(",").map(materia => materia.trim());

        const newBody = { nombre, curso, materias, padre_madre, legajo };

        alumnos.push(newBody);

        // Guardar los cambios en el archivo JSON alumnos
        const filePathAlumno = path.join(__dirname, "../database/alumnos.json");
        fs.writeFileSync(filePathAlumno, JSON.stringify(alumnos, null, 2), "utf-8");
        

        // Guardar datos de calificaciones vacias del alumno
        const filePathCalificaciones = path.join(__dirname, "../database/calificaciones.json");
        materias.map(materia => {
          calificacionesJSON.push( {
            "legajo": legajo,
            "materia": materia,
            "calificacion": ""
          },)
        });
        fs.writeFileSync(filePathCalificaciones, JSON.stringify(calificacionesJSON, null, 2), "utf-8");
        

        // Guarda un nuevo usuario en usuarios.JSON
        const newUsuario = { legajo, contraseña, "rol": "alumno/padre" }
        usuarios.push(newUsuario)
        const filePathUsuario = path.join(__dirname, "../database/usuarios.json");
        fs.writeFileSync(filePathUsuario, JSON.stringify(usuarios, null, 2), "utf-8");

        return newBody;
      }

    } catch (error) {
      throw error;
    }

  }
  borrar(legajo) {
    try {

      // Borrado del alumno de alumnos.JSON
      const newAlumnos = alumnos.filter(it => it.legajo != legajo)
      if(newAlumnos.length != alumnos.length){
        const filePathAlumnos = path.join(__dirname, "../database/alumnos.json");
        fs.writeFileSync(filePathAlumnos, JSON.stringify(newAlumnos, null, 2), "utf-8");



        // Borrado del usuario de usuarios.JSON
        const newUsuarios = usuarios.filter(it => it.legajo != legajo)
        const filePathUsuarios = path.join(__dirname, "../database/usuarios.json");
        fs.writeFileSync(filePathUsuarios, JSON.stringify(newUsuarios, null, 2), "utf-8");


        return `El alumno con legajo N° ${legajo} ha sido eliminado correctamente de la base de datos.`
    }else{
      return
    }
    } catch (error) {
      throw error;

    }
  }
};

module.exports = alumnosController
