const Curso = require("../models/curso");

class cursosController {
  static async buscarCursosPorProfesor(legajo) {
    const cursosDeProf = await Curso.find({ profesores: { $in: [legajo] } });
    return cursosDeProf;
  }

  static async buscarMateriasPorCurso(curso) {
    const cursoEncontrado = await Curso.findOne({ curso: curso });
    return cursoEncontrado ? cursoEncontrado.materias : null;
  }
}

module.exports = cursosController;
