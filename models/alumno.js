const mongoose = require('mongoose'); 


const alumnoSchema = new mongoose.Schema({
    nombre : {type: String ,require : true},
    curso : {type: String, enum:["1A","1B","2A","2B","3A","3B","4A","4B","5A","5B"] ,require : true},
    materias : {type: Array ,require : true},
    padre_madre : {type: String,require : true},
    legajo : {type: Number ,require : true}
})

const Alumno = mongoose.model("Alumno",alumnoSchema);

module.exports = Alumno;