import Product from "../../../domain/product/entity/product"
import UpdateProductUseCase from "./update.product.usecase"

const mockRepository = {
  create: jest.fn(),
  findById: jest.fn().mockResolvedValueOnce(new Product('1', 'p1', 10)),
  update: jest.fn(),
  findAll: jest.fn(),
}

const mockInput = () => ({
  id: '1',
  name: 'p2',
  price: 20
})

const mockSut = () => new UpdateProductUseCase(mockRepository)

describe('Unit Test Update Product UseCase', () => {
  it ('should update a product', async () => {
    const input = mockInput();

    const output = await mockSut().execute(input)

    const outputExpected = {
      id: input.id,
      name: input.name,
      price: input.price
    }

    expect(output).toEqual(outputExpected)
    expect(mockRepository.findById).toBeCalledWith(input.id)
    expect(mockRepository.update).toBeCalledWith(expect.objectContaining(outputExpected))
  })
})