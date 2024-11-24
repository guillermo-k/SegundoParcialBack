const request = require('supertest');
const express = require('express');
const router = require("../routes/index");
const app = express();
app.use('/', router);
const DB = require("../db");
beforeAll(()=>{DB.connectDB()})
afterAll(()=>{DB.disconnectDB()})


describe(`Testing de endpoints` , ()=>{

    it(`Logín con credenciales correctas`, async ()=>{
        const req = {};
        req.body = { legajo: '1000', pass: 'iPvlb9bb' };
        console.log(req, "desde el test")
        const response = await request(app).post('/').send(req.body);

        //expect(response.statusCode).toBe(302); // Redirección
        expect(response.headers.location).toBe('/alumnos/1000');
    })
})