var express = require("express");
var router = express.Router();

const alumnosController = require("../controllers/alumnosController");
const Alumnos = new alumnosController();


router.get("/:legajo?", async (req, res) => {
  const legajo = req.params.legajo;

  const respuesta = legajo ? await Alumnos.mostrarByLegajo(legajo) : await Alumnos.mostrar();

  respuesta ? res.json(respuesta): res.sendStatus(400)
   
});


router.post("/", (req, res) => {
  console.log(req)
const {body} = req 
console.log(body)
const respuesta = Alumnos.agregar(body)
respuesta ? res.json(respuesta): res.sendStatus(400)

})


module.exports = router;


/* 
const { body } = req;
  const product = await Productos.guardar(body);
  res.json(product); */