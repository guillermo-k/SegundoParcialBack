const mongoose = require('mongoose'); 


const calificacionSchema = new mongoose.Schema({
    legajo: {type: Number , require : true},
    materia: {type: String , require : true},
    calificacion: {type: String , require : true}
})

const Calificacion = mongoose.model("Calificacion",calificacionSchema);

module.exports = Calificacion;