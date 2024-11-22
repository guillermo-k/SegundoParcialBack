var express = require("express");
var router = express.Router();
const usuariosController = require("../controllers/usuariosController")

// const usuarios = require("../database/usuarios");

/* API que devuelve lista de usuarios */
router.get("/", async (req, res) => {
  const usuarios = await usuariosController.getUsuarios();
  res.status(200).json(usuarios);
});

module.exports = router;
