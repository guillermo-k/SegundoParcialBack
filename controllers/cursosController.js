/* const fs = require("fs");
const path = require("path"); */

const cursos = require("../database/cursos.json");
const Curso = require("../models/curso");

class cursosController {
  static async buscarCursosPorProfesor(legajo) {
    /*   const cursosDeProf = cursos.filter(it => it.profesores.includes(legajo));
        return cursosDeProf; */

    const cursosDeProf = await Curso.find({ profesores: { $in: [legajo] } });
    console.log("cursosdeprof desde controller metodo buscarcursosporprofesor", cursosDeProf);
    return cursosDeProf;
  }

  static async buscarMateriasPorCurso(curso) {
    const cursoEncontrado = await Curso.findOne({ curso: curso });
    return cursoEncontrado ? cursoEncontrado.materias : null;
  }
}

module.exports = cursosController;
