const alumnos = require("../database/alumnos.json");
const fs = require("fs");
const path = require("path");

// Función para mostrar todos los alumnos
function mostrar() {
  try {
    return alumnos;
  } catch (error) {
    throw error;
  }
}

// Función para mostrar un alumno por su legajo
function mostrarPorLegajo(legajo) {
  try {
    const alumno = alumnos.find(alumno => alumno.legajo == legajo);
    return alumno;
  } catch (error) {
    throw error;
  }
}

// Función para agregar un nuevo alumno
function agregar(body) {
  console.log("body en agregar", body);
  const { nombre, curso, materias, padre_madre, contraseña } = body;

  if (nombre && curso && materias && padre_madre && contraseña) {
    ////Generación de número de legajo
    const legajo = Math.max(...alumnos.map(alumno => alumno.legajo)) + 1;
    console.log(legajo);

    // Convierte las materias (que vienen del form de la vista) en array
    const materiasArray = materias.split(",").map(materia => materia.trim());

    const newBody = { nombre, curso, materias: materiasArray, padre_madre, contraseña, legajo };

    alumnos.push(newBody);
    
    // Guardar los cambios en el archivo JSON
    const filePath = path.join(__dirname, "../database/alumnos.json");
    fs.writeFileSync(filePath, JSON.stringify(alumnos, null, 2), "utf-8");

    return newBody;
  }

  try {
  } catch (error) {
    throw error;
  }
}

module.exports = {
  mostrar,
  mostrarPorLegajo,
  agregar
};
