const alumnosController = require("../controllers/alumnosController");

describe(`Testeando busqueda de alumno por legajo`, ()=>{
    test(`Busqueda de alumno con legajo existente: 1000`,async()=>{
        console.log("antes")
        const data = await alumnosController.mostrarPorLegajo(1000);
        console.log("desues")
        // const data = "1000"
        // expect(data).not.toBeNull;
        expect(data).toContain("1000");
        // expect(data).toContain("2B");
        // expect(data).toContain("Diego Fernández");
    },20000);

    // it(`Busqueda de alumno con legajo inexistente: -1000`,async()=>{
    //     const data = alumnosController.mostrarPorLegajo(-1000);
    //     expect(data).toBeNull;
    //     expect(data).not.toBeContain(-1000);
    //     expect(data).not.toBeContain("2B");
    //     expect(data).not.toBeContain("Diego Fernández");
    // });

    
});