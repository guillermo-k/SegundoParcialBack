const calificaciones = require("../database/calificaciones.json")


class calificacionesController{
    obtenerCalificaciones(legajo){
        return calificaciones.filter(it=>it.legajo == legajo)
    }
}


module.exports = calificacionesController;