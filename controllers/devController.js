
const Usuario = require("../models/Usuario")
const Curso = require("../models/curso");
const alumnosController = require("./alumnosController");
const Alumno = require("../models/Alumno");
  /////////// Método auxiliar de uso en desarrollo///////////

  async function CargaAutomaticaAlumnos() {
    let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (const a of alumnos) {
      a.contraseña = Array.from(
        { length: 8 },
        () => caracteres[Math.floor(Math.random() * caracteres.length)]
      ).join("");
      let alumno = {
        nombre: a.nombre,
        curso: a.curso,
        padre_madre: a.padre_madre,
        contraseña: a.contraseña
      };
      // setTimeout(this.agregar(alumno), 2000);
      await alumnosController.agregar(alumno);
    }
  }

  async function CargaAutomaticaProfesores(){
    const todos = await Curso.find({}, { profesores: 1, _id: 0 });

    const uniqueProfesores = new Set(todos.flatMap(item => item.profesores));
    const uniqueProfesoresArray = [...uniqueProfesores].sort();
    let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    uniqueProfesoresArray.map(prof => {
        const contraseña = Array.from(
            { length: 8 },
            () => caracteres[Math.floor(Math.random() * caracteres.length)]
          ).join("");
        const profe = new Usuario({legajo:prof, contraseña:contraseña, rol:"profesor"});
        profe.save();
    }
    )
  }
async function CargaAutomaticaAdministradores(){

let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
for(i=1;i<6;i++){
    const contraseña = Array.from(
        { length: 8 },
        () => caracteres[Math.floor(Math.random() * caracteres.length)]
        ).join("");
    const admin = new Usuario({legajo:i*10, contraseña:contraseña, rol:"administrador"});
    await admin.save();
  }
}

async function BorradoDeAlumnos() {
    const alumnos = await Alumno.find({}, { legajo: 1, _id: 0 });
    // alumnos.forEach( async alumno=>{
    //     await alumnosController.borrar(alumno.legajo);
    // })
}

  module.exports = {CargaAutomaticaAlumnos,CargaAutomaticaProfesores,CargaAutomaticaAdministradores,BorradoDeAlumnos}