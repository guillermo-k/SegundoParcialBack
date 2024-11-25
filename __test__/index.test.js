const request = require('supertest');
const express = require('express');
const router = require('../routes/index');
const app = express();
const DB = require('../db');

// Mock de dependencias
jest.mock('jsonwebtoken');
// Configurar app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

beforeAll(() => DB.connectDB());
afterAll(() => DB.disconnectDB());

describe('Testing de endpoints', () => {
  it('Logín con credenciales correctas', async () => {
    const response = await request(app)
      .post('/')
      .set('Content-Type', 'application/json')
      .send({ legajo: '1000', pass: 'iPvlb9bb' });

    expect(response.headers.location).toBe('/alumnos/1000');
  });

  it('Logín con credenciales incorrectas', async () => {
    const response = await request(app)
      .post('/')
      .set('Content-Type', 'application/json')
      .send({ legajo: '999', pass: 'iPvlb9bb' });

    expect(response.statusCode).toBe(401);
  });
});
