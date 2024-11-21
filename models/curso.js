const mongoose = require('mongoose'); 


const cursoSchema = new mongoose.Schema({
    curso : {type: String, require: true},
    id : {type: Number, require: true},
    materias : {type: Array, require: true},
    profesores : {type: Array, require: true},
})

const Curso = mongoose.model("Curso",cursoSchema);

module.exports = Curso;