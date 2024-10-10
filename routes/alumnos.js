var express = require('express');
var router = express.Router();

const alumnos=require('../database/alumnos')

router.get('/', (req,res)=> {
res.render("lista de alumnos")
})


module.exports = router;
