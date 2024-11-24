/* Controllers */
const Usuarios = require("./usuariosController");
const Calificaciones = require("./calificacionesController");
const Cursos = require("./cursosController");

/* Model Alumno */
const Alumno = require("../models/Alumno");


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
          element.materias = await Calificaciones.buscarCalificacionLegajoMateria(
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
    try {
      const { nombre, curso, padre_madre, contraseña } = body;
      if (nombre && curso && padre_madre && contraseña) {
        ////Generación de número de legajo
        const ultimoLegajo = await Alumno.findOne().sort({ legajo: -1 });
        const legajo = ultimoLegajo ? ultimoLegajo.legajo + 1 : 1000;

        const materias = await Cursos.buscarMateriasPorCurso(curso);

        const newBody = { ...body, materias, legajo: legajo };

        const nuevoAlumno = new Alumno(newBody);
        const savedAlumno = await Promise.resolve(nuevoAlumno.save());

        // Guardar datos de calificaciones vacías del alumno
        Calificaciones.crearCalificacionesVacias({ materias: materias, legajo: legajo });

        // Guarda un nuevo usuario
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
      
      const alumnoBorrado = await Alumno.findOneAndDelete({ legajo: legajo });
      if (alumnoBorrado) {
      
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

}

module.exports = alumnosController;
