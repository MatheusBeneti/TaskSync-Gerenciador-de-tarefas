const request = require('supertest');
const app = require('./routers/routers.js');

describe('Testando rota /api/hello', () => {
  test('Deve retornar a mensagem correta', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello, Jest!');
  });
});
