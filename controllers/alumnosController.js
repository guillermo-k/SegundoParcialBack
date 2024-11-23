/* Controllers */
const Usuarios = require("./usuariosController");
const Calificaciones = require("./calificacionesController");
const Cursos = require("./cursosController");
const bcrypt = require('bcrypt');


/* Model Alumno */
const Alumno = require("../models/Alumno");

let alumnos = require("../database/alumnos.json");
/* let alumnos2 = require("../database/alumnos2.json"); */

class alumnosController {
  // Método para mostrar todos los alumnos
  static async mostrar() {
    try {
      const alumnos = await Alumno.find();

      const alumnosConCalificaciones = await Promise.all(
        alumnos.map(async element => {
          element.materias = await Calificaciones.obtenerCalificacionesPorLegajo(element.legajo);
          return element;
        })
      );

      return alumnosConCalificaciones;
    } catch (error) {
      throw error;
    }
  }

  // Método que muestra un solo alumno, búsqueda por legajo
  static async mostrarPorLegajo(legajo) {
    try {
      const alumno = await Alumno.findOne({ legajo: legajo });
      if (alumno) {
        alumno.materias = await Calificaciones.obtenerCalificacionesPorLegajo(alumno.legajo);
        return alumno;
      }
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar un alumno por su curso
  static async mostrarPorCursoYMateria(curso, materia) {
    try {
      const alumnos = await Alumno.find({ curso: curso });
      const alumnosCurso = await Promise.all(
        alumnos.map(async element => {
          element.materias =  await Calificaciones.buscarCalificacionLegajoMateria(
            element.legajo,
            materia
          );
        })
      );

     
      return alumnos;
    } catch (error) {
      throw error;
    }
  }

  // Método para agregar un nuevo alumno
  static async agregar(body) {
    console.log("algo")
    try {
      const { nombre, curso, padre_madre, contraseña } = body;
      if (nombre && curso && padre_madre && contraseña) {
        ////Generación de número de legajo
        const ultimoLegajo = await Alumno.findOne().sort({ legajo: -1 });
        const legajo = ultimoLegajo ? ultimoLegajo.legajo + 1 : 1000;

        const materias = await Cursos.buscarMateriasPorCurso(curso);

        const newBody = { nombre, curso, materias, padre_madre, legajo: legajo };

      
        const nuevoAlumno = new Alumno(newBody);
        const savedAlumno = await Promise.resolve(nuevoAlumno.save());

        // Guardar datos de calificaciones vacías del alumno
        Calificaciones.crearCalificacionesVacias({ materias: materias, legajo: legajo });

        // Guarda un nuevo usuario en usuarios.JSON
        const newUsuario = { legajo: legajo, contraseña, rol: "alumno/padre" };
        Usuarios.agregarUsuario(newUsuario);
        return newBody;
      }
    } catch (error) {
      throw error;
    }
  }
  static async borrar(legajo) {
    try {
      // Borrado del alumno de alumnos.JSON
      const alumnoBorrado = await Alumno.findOneAndDelete({ legajo: legajo });
      if (alumnoBorrado) {
        // Borrado del usuario de usuarios.JSON
        Usuarios.borrarUsuario(legajo);

        // Borrado de las calificaciones del alumno
        Calificaciones.borrarCalificacionesLegajo(legajo);

        return `El alumno ${alumnoBorrado.nombre} ha sido eliminado correctamente de la base de datos.`;
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }
  }

   /////////// Método auxiliar de uso en desarrollo///////////

  static async CargaAutomaticaAlumnos() {
    let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(const a of alumnos) {
      a.contraseña = Array.from(
        { length: 8 },
        () => caracteres[Math.floor(Math.random() * caracteres.length)]
      ).join("");
      let alumno = {
        nombre: a.nombre,
        curso: a.curso,
        padre_madre: a.padre_madre,
        contraseña: a.contraseña
      };
      // setTimeout(this.agregar(alumno), 2000);
      await this.agregar(alumno);
    };
  }
}

module.exports = alumnosController;
