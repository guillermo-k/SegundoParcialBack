/* const fs = require("fs");
const path = require("path"); */

const cursos = require("../database/cursos.json")
const Curso = require("../models/curso")

class cursosController{


    /* ***********SE USA???*********** */
    static async buscarCursosPorProfesor(legajo){
      /*   const cursosDeProf = cursos.filter(it => it.profesores.includes(legajo));
        return cursosDeProf; */

        const cursosDeProf = await Curso.find({ profesores: { $in: [legajo] } });
        return cursosDeProf
    }




    static async buscarMateriasPorCurso(curso){
        const cursoEncontrado = await Curso.findOne({ curso: curso });
        return cursoEncontrado ? cursoEncontrado.materias : null;
    }
}



module.exports = cursosController