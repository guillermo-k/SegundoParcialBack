const fs = require("fs");
const path = require("path");
const Usuarios = require("./usuariosController");
const Calificaciones = require("./calificacionesController");
const Cursos = require("./cursosController");
const Alumno = require("../models/Alumno")

let alumnos = require("../database/alumnos.json");
/* let alumnos2 = require("../database/alumnos2.json"); */

class alumnosController {
  // Método para mostrar todos los alumnos
  static async mostrar() {
    try {
      // const alumnos2 = JSON.parse(JSON.stringify(alumnos));
      const alumnos2 = await Alumno.find();
      alumnos2.map(element => {
        element.materias = Calificaciones.obtenerCalificacionesPorLegajo(element.legajo);
      });
      return alumnos2;
    } catch (error) {
      throw error;
    }
  }

  // Método que muestra un solo alumno, búsqueda por legajo
  static async mostrarPorLegajo(legajo) {
    try {
      const alumno = await Alumno.findOne({legajo:legajo});
      if (alumno) {
        alumno.materias = Calificaciones.obtenerCalificacionesPorLegajo(alumno.legajo);
        return alumno;
      }
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar un alumno por su curso
  static async mostrarPorCursoYMateria(curso, materia) {
    try {
      const alumnosCurso = await Alumno.find({curso:curso})
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
        const ultimoLegajo = await Alumno.findOne().sort({legajo: -1 });
        const legajo = ultimoLegajo ? ultimoLegajo.legajo + 1 : 1000;

        const materias = Cursos.buscarMateriasPorCurso(curso)

        const newBody = { nombre, curso, materias, padre_madre, legajo: legajo };

        alumnos.push(newBody);
        const nuevoAlumno = new Alumno(newBody);
        const savedAlumno = await nuevoAlumno.save();

        // Guardar datos de calificaciones vacías del alumno
        Calificaciones.crearCalificacionesVacias({"materias":materias, "legajo":legajo})

        // Guarda un nuevo usuario en usuarios.JSON
        const newUsuario = { nuevoLegajo: legajo, contraseña, rol: "alumno/padre" };
        Usuarios.agregarUsuario(newUsuario)
        return newBody;
      }
    } catch (error) {
      throw error;
    }
  }
  static async borrar(legajo) {
    try {
      // Borrado del alumno de alumnos.JSON
      const alumnoBorrado = await Alumno.findOneAndDelete({legajo:legajo})
      if (alumnoBorrado) {
        

        // Borrado del usuario de usuarios.JSON
        Usuarios.borrarUsuario(legajo)

        // Borrado de las calificaciones del alumno
        Calificaciones.borrarCalificacionesDeJsonPorLegajo(legajo);

        return `El alumno ${alumnoBorrado.nombre} ha sido eliminado correctamente de la base de datos.`;
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }

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
