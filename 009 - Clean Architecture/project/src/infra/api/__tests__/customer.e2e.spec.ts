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

  it('should list all customers', async () => {
    const customers = [
      {
        name: 'Kelps Gomes',
        address: {
          street: 'Rua 1',
          number: 123,
          city: 'Cidade 1',
          zipCode: '12345678'
        }
      },
      {
        name: 'Gomes Kelps',
        address: {
          street: 'street 2',
          number: 321,
          city: 'city 2',
          zipCode: '87654321'
        }
      }
    ];
    for (const customer of customers) {
      await request(app).post('/customers').send(customer)
    }

    const response = await request(app).get('/customers').send()

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].id).toBeTruthy();
    expect(response.body[0].name).toBe('Kelps Gomes');
    expect(response.body[0].address.street).toBe('Rua 1');
    expect(response.body[1].id).toBeTruthy();
    expect(response.body[1].name).toBe('Gomes Kelps');
    expect(response.body[1].address.street).toBe('street 2');

    const listResponseXML = await request(app).get('/customers').set('Accept', 'application/xml').send()

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    expect(listResponseXML.text).toContain(`<customers>`)
    expect(listResponseXML.text).toContain(`<customer>`)
    expect(listResponseXML.text).toContain(`<name>Kelps Gomes</name>`)
    expect(listResponseXML.text).toContain(`<address>`)
    expect(listResponseXML.text).toContain(`<street>Rua 1</street>`)
    expect(listResponseXML.text).toContain(`<number>123</number>`)
    expect(listResponseXML.text).toContain(`<city>Cidade 1</city>`)
    expect(listResponseXML.text).toContain(`<zipCode>12345678</zipCode>`)
    expect(listResponseXML.text).toContain(`</address>`)
    expect(listResponseXML.text).toContain(`</customer>`)
    expect(listResponseXML.text).toContain(`<customer>`)
    expect(listResponseXML.text).toContain(`<name>Gomes Kelps</name>`)
    expect(listResponseXML.text).toContain(`<address>`)
    expect(listResponseXML.text).toContain(`<street>street 2</street>`)
    expect(listResponseXML.text).toContain(`<number>321</number>`)
    expect(listResponseXML.text).toContain(`<city>city 2</city>`)
    expect(listResponseXML.text).toContain(`<zipCode>87654321</zipCode>`)
    expect(listResponseXML.text).toContain(`</address>`)
    expect(listResponseXML.text).toContain(`</customer>`)
    expect(listResponseXML.text).toContain(`</customers>`)
  })
});
