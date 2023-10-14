import { app, sequelize } from '../express'
import request from 'supertest'

describe('Product E2E', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  })

  afterAll(async () => {
    await sequelize.close();
  })

  it('should create a product', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        name: 'Product 1',
        price: 10
      })

    expect(response.status).toBe(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toBe('Product 1');
    expect(response.body.price).toBe(10);
  })

  it('should not create a product', async () => {
    const response = await request(app).post('/product').send({})

    expect(response.status).toBe(500);
  });

  it('should list all product', async () => {
    const products = [
      {
        name: 'Product 1',
        price: 10
      },
      {
        name: 'Product 2',
        price: 20
      }
    ];
    for (const product of products) {
      await request(app).post('/product').send(product)
    }

    const response = await request(app).get('/product').send()

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].id).toBeTruthy();
    expect(response.body[0].name).toBe('Product 1');
    expect(response.body[0].price).toBe(10);
    expect(response.body[1].id).toBeTruthy();
    expect(response.body[1].name).toBe('Product 2');
    expect(response.body[1].price).toBe(20);
  })
});
