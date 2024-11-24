const alumnosController = require("../controllers/alumnosController");
const DB = require("../db");
beforeAll(()=>{DB.connectDB()})
afterAll(()=>{DB.disconnectDB()})
// connectDB;

describe(`Testeando busqueda de alumno por legajo`, ()=>{

    it(`Busqueda de alumno con legajo existente: 1000`,async()=>{
        const data = await alumnosController.mostrarPorLegajo(1000);
        expect(data).not.toBeNull;
        expect(data.legajo)===(1000);
        expect(data.curso)===("2B");
        expect(data.nombre).toContain("Diego Fernández");
    });

    it(`Busqueda de alumno con legajo inexistente: -1000`,async()=>{
        const data2 = alumnosController.mostrarPorLegajo(-1000);
        expect(data2).toBeNull;
        expect(data2.legajo).toBeUndefinided;
        // expect(data2.curso).not.toContain("2B");
        // expect(data2.nombre).not.toContain("Diego Fernández");
    });
    
});