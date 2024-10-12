const alumnos = require("../database/alumnos");

class alumnosController {
  constructor() {
    this.alumnos = alumnos;
  }

  mostrar() {
    try {
      return alumnos;
    } catch (error) {
      throw error;
    }
  }

  mostrarByLegajo(legajo) {
    try {
      const alumno = alumnos.find(alumno => alumno.legajo == legajo);
      return alumno;
    } catch (error) {
      throw error;
    }
  }

  agregar(body) {
    console.log("body en agregar", body)
    const { nombre, curso, materias, padre_madre, contraseña } = body;

    if (nombre && curso && materias && padre_madre && contraseña) {
      const legajo = Math.max(alumnos.map(alumno => parseInt(alumno.legajo))) + 1;

      const newBody = { nombre, curso, materias, padre_madre, contraseña, legajo };

      alumnos.push(newBody);
      console.log(newBody)
      return this.mostrarByLegajo(legajo)
    }

    try {
    } catch (error) {
      throw error;
    }
  }
}

module.exports = alumnosController;
