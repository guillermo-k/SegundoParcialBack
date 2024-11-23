var express = require("express");
var router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const autorizacion = require("../middleware/autorizacion");

// const usuarios = require("../database/usuarios");

/* API que devuelve lista de usuarios */
router.get("/",autorizacion(["administrador"]), async (req, res) => {
  const usuarios = await usuariosController.getUsuarios();
  res.status(200).json(usuarios);
});

module.exports = router;
