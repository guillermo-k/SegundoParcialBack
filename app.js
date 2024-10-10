var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

/* **************IMPORTAR TODAS LAS RUTAS************ */
const alumnos = require("./routes/alumnos");
const calificaciones = require("./routes/calificaciones");
const cursos = require("./routes/cursos");
const usuarios = require("./routes/usuarios");

/* app.use() se utiliza comúnmente para montar un router desde un archivo de rutas externo. */
app.use("/alumnos", alumnos);
app.use("/calificaciones", calificaciones);
app.use("/cursos", cursos);
app.use("/usuarios", usuarios);

// CAMBIÉ EL MOTOR DE VISTAS DE JADE A PUG*********
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


/* ******************************************* */
/* middleware globales a todas las rutas */

// Habilitar parsing de JSON
app.use(express.json());

// Habilitar parsing de datos de formularios
app.use(express.urlencoded({ extended: true }));

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
/* ******************************************* */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
