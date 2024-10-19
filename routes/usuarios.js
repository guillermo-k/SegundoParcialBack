var express = require("express");
var router = express.Router();

const usuarios = require("../database/usuarios");

/* API que devuelve lista de usuarios */
router.get("/", (req, res) => {
  res.status(200).json(usuarios);
});

module.exports = router;
