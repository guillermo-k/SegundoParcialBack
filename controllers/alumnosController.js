const fs = require("fs");
const path = require("path");
const Usuarios = require("./usuariosController");
const Calificaciones = require("./calificacionesController");
const Cursos = require("./cursosController")
const Alumno = require("../models/alumno")

let alumnos = require("../database/alumnos.json");
/* let alumnos2 = require("../database/alumnos2.json"); */

class alumnosController {
  // Método para mostrar todos los alumnos
  static async mostrar() {
    try {
      // const alumnos2 = JSON.parse(JSON.stringify(alumnos));
      const alumnos2 = await Alumno.find();
      // alumnos2.map(element => {
      //   element.materias = Calificaciones.obtenerCalificacionesPorLegajo(element.legajo);
      // });
      return alumnos2;
    } catch (error) {
      throw error;
    }
  }

  // Método que muestra un solo alumno, búsqueda por legajo
  static mostrarPorLegajo(legajo) {
    try {
      const alumno = alumnos.find(alumno => alumno.legajo == legajo);
      if (alumno) {
        alumno.materias = Calificaciones.obtenerCalificacionesPorLegajo(alumno.legajo);
        return alumno;
      }
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar un alumno por su curso
  static mostrarPorCursoYMateria(curso, materia) {
    try {
      const alumnosCurso = alumnos.filter(alumno => alumno.curso == curso);
      alumnosCurso.map(element => {
        element.materias = Calificaciones
          .obtenerCalificacionesPorLegajo(element.legajo)
          .filter(element => element.materia == materia);
      });
      return alumnosCurso;
    } catch (error) {
      throw error;
    }
  }

  // Método para agregar un nuevo alumno
  static async agregar(body) {
    try {
      const { nombre, curso, padre_madre, contraseña } = body;

      if (nombre && curso && padre_madre && contraseña) {
        ////Generación de número de legajo
        const legajo = Math.max(...alumnos.map(alumno => alumno.legajo)) + 1;

        const materias = Cursos.buscarMateriasPorCurso(curso)

        const newBody = { nombre, curso, materias, padre_madre, legajo };

        alumnos.push(newBody);
        const nuevoAlumno = new Alumno(newBody);
        console.log("111121212")
        const savedAlumno = await nuevoAlumno.save();
        console.log("222222222222222333")
        // Guardar los cambios en el archivo JSON alumnos
        this.actualizarJson(alumnos)

        // Guardar datos de calificaciones vacías del alumno
        Calificaciones.crearCalificacionesVacias({"materias":materias, "legajo":legajo})

        // Guarda un nuevo usuario en usuarios.JSON
        const newUsuario = { legajo, contraseña, rol: "alumno/padre" };
        Usuarios.agregarUsuario(newUsuario)
        return newBody;
      }
    } catch (error) {
      throw error;
    }
  }
  static borrar(legajo) {
    try {
      // Borrado del alumno de alumnos.JSON
      const newAlumnos = alumnos.filter(it => it.legajo != legajo);
      if (newAlumnos.length != alumnos.length) {
        alumnos = newAlumnos;
        this.actualizarJson(newAlumnos)

        // Borrado del usuario de usuarios.JSON
        Usuarios.borrarUsuario(legajo)

        // Borrado de las calificaciones del alumno
        Calificaciones.borrarCalificacionesDeJsonPorLegajo(legajo);

        return `El alumno con legajo N° ${legajo} ha sido eliminado correctamente de la base de datos.`;
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }

  }
  
  
  static actualizarJson(datos){
    const filePathAlumnos = path.join(__dirname, "../database/alumnos.json");
    fs.writeFileSync(filePathAlumnos, JSON.stringify(datos, null, 2), "utf-8");
  }

  /* /////////// Método auxiliar de uso en desarrollo///////////

  CargaAutomaticaAlumnos() {
    alumnos2.forEach(a => {
      let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      a.contraseña = Array.from(
        { length: 4 },
        () => caracteres[Math.floor(Math.random() * caracteres.length)]
      ).join("");
      let alumno = {
        nombre: a.nombre,
        curso: a.curso,
        padre_madre: a.padre_madre,
        contraseña: a.contraseña
      };
      this.agregar(alumno);
    });
  } */

}

module.exports = alumnosController;
