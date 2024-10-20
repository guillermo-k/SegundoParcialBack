const fs = require("fs");
const path = require("path");

const cursos = require("../database/cursos.json")

class cursosController{
    static buscarCursosPorProfesor(legajo){
        const cursosDeProf = cursos.filter(it => it.profesores.includes(legajo));
        return cursosDeProf;
    }

    static buscarMateriasPorCurso(curso){
        return cursos.find(item => item.curso == curso).materias
    }
}



module.exports = cursosController