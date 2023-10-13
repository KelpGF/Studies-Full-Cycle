import { Sequelize } from "sequelize-typescript"
import ListProductUseCase from "./list.product.usecase"
import ProductModel from "../../../infra/product/repository/sequilize/product.model"
import ProductRepository from "../../../infra/product/repository/sequilize/product.repository"
import Product from "../../../domain/product/entity/product"

const mockSut = () => new ListProductUseCase(new ProductRepository())

describe('Integration Test List Product UseCase', () => {
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

  it ('should list a product', async () => {
    const product = new Product('1', 'p1', 10)
    const product2 = new Product('2', 'p2', 20)
    await Promise.all([
      new ProductRepository().create(product),
      new ProductRepository().create(product2)
    ])

    const result = await mockSut().execute({})

    expect(result).toEqual({
      products: [
        expect.objectContaining({
          id: '1',
          name: 'p1',
          price: 10
        }),
        expect.objectContaining({
          id: '2',
          name: 'p2',
          price: 20
        }),
      ]
    })
  })
})