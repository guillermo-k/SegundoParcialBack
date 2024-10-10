var express = require('express');
var router = express.Router();

const usuarios=require('../database/usuarios')

router.get('/', (req,res)=> {
req.render("lista de usuarios")
})


module.exports = router;