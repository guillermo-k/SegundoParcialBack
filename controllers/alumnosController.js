const alumnos = require("../database/alumnos.json");
const fs = require("fs");
const path = require("path");

class alumnosController {
  constructor() {
    this.alumnoscualca = alumnos;
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
      const legajo = Math.max(...alumnos.map(alumno => (alumno.legajo)))+1
      console.log(legajo)

      const newBody = { nombre, curso, materias, padre_madre, contraseña, legajo };

      alumnos.push(newBody);
      console.log(newBody)


      // Guardar los cambios en el archivo JSON
      const filePath = path.join(__dirname, "../database/alumnos.json");
      fs.writeFileSync(filePath, JSON.stringify(alumnos, null, 2), "utf-8");

      
      return this.mostrarByLegajo(legajo)
    }

    try {
    } catch (error) {
      throw error;
    }
  }
}

module.exports = alumnosController;
