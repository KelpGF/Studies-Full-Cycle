import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model"
import Product from "../../../../domain/entity/product";

describe('ProductRepository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'p1', 10)

    await productRepository.create(product)

    const productCreated = await ProductModel.findOne({ where: { id: '1' } })

    expect(productCreated.toJSON()).toStrictEqual({
      id: '1',
      name: 'p1',
      price: 10
    })
  })
})
