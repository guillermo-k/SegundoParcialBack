var express = require('express');
var router = express.Router();

const calificaciones=require('../database/calificaciones')

router.get('/', (req,res)=> {
res.render("calificaciones", { title: 'Calificaciones' })
})


module.exports = router;