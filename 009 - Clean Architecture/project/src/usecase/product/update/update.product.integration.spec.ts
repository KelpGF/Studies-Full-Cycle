import { Sequelize } from "sequelize-typescript"
import UpdateProductUseCase from "./update.product.usecase"
import ProductModel from "../../../infra/product/repository/sequilize/product.model"
import ProductRepository from "../../../infra/product/repository/sequilize/product.repository"

const mockInput = () => ({
  id: '1',
  name: 'p2',
  price: 20
})

const mockSut = () => new UpdateProductUseCase(new ProductRepository())

describe('Integration Test Update Product UseCase', () => {
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

  it ('should update a product', async () => {
    const input = mockInput();
    await ProductModel.create({
      id: input.id,
      name: "p1",
      price: 10
    })

    const result = await mockSut().execute(input)

    const outputExpected = {
      id: '1',
      name: input.name,
      price: input.price
    }

    expect(result).toEqual(expect.objectContaining(outputExpected))
  })
})