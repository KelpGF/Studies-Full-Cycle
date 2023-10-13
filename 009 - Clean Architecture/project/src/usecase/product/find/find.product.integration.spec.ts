import { Sequelize } from "sequelize-typescript"
import FindProductUseCase from "./find.product.usecase"
import ProductModel from "../../../infra/product/repository/sequilize/product.model"
import ProductRepository from "../../../infra/product/repository/sequilize/product.repository"
import Product from "../../../domain/product/entity/product"

const mockSut = () => new FindProductUseCase(new ProductRepository())

describe('Integration Test Find Product UseCase', () => {
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

  it ('should find a product', async () => {
    const product = new Product('1', 'p1', 10)
    await new ProductRepository().create(product)

    const result = await mockSut().execute({ id: '1' })

    const outputExpected = {
      id: '1',
      name: 'p1',
      price: 10
    }

    expect(result).toEqual(outputExpected)
  })
})