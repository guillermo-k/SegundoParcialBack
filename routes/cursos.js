var express = require('express');
var router = express.Router();

const cursos=require('../database/cursos')

router.get('/', (req,res)=> {
req.render("lista de cursos")
})


module.exports = router;