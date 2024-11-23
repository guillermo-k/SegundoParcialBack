var express = require("express");
var router = express.Router();
const Dev = require("../controllers/devController")


//////////////////////Rutas auxiliares para uso en desarrollo//////////////////////


router.get("/cargaautomaticaalumnos", (req, res) => {
  Dev.CargaAutomaticaAlumnos();
});
router.get("/cargaautomaticaprofesores", (req, res) => {
  Dev.CargaAutomaticaProfesores();
});
router.get("/cargaautomaticaadministradores", (req, res) => {
  Dev.CargaAutomaticaAdministradores();
});
router.get("/borrarAlumnos", (req, res) => {
  Dev.BorradoDeAlumnos();
});

module.exports = router;
