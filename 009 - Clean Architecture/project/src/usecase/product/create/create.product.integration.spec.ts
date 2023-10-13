import { Sequelize } from "sequelize-typescript"
import CreateProductUseCase from "./create.product.usecase"
import ProductModel from "../../../infra/product/repository/sequilize/product.model"
import ProductRepository from "../../../infra/product/repository/sequilize/product.repository"

const mockInput = () => ({
  name: 'p1',
  price: 10
})

const mockSut = () => new CreateProductUseCase(new ProductRepository())

describe('Integration Test Create Product UseCase', () => {
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

  it ('should create a product', async () => {
    const input = mockInput();
    await mockSut().execute(input)

    const product = await ProductModel.findOne({ where: { name: input.name } })

    const outputExpected = {
      id: expect.any(String),
      name: input.name,
      price: input.price
    }

    expect(product).toEqual(expect.objectContaining(outputExpected))
  })
})