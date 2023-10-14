import { app, sequelize } from '../express'
import request from 'supertest'

describe('Customer E2E', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  })

  afterAll(async () => {
    await sequelize.close();
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customers')
      .send({
        name: 'Kelps Gomes',
        address: {
          street: 'Rua 1',
          number: 123,
          city: 'Cidade 1',
          zipCode: '12345678'
        }
      })

    expect(response.status).toBe(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toBe('Kelps Gomes');
    expect(response.body.address.street).toBe('Rua 1');
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.city).toBe('Cidade 1');
    expect(response.body.address.zipCode).toBe('12345678');
  })

  it('should not create a customer', async () => {
    const response = await request(app).post('/customers').send({})

    expect(response.status).toBe(500);
  });
});
