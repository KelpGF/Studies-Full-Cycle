import FindProductUseCase from "./find.product.usecase"

const mockRepository = () => ({
  create: jest.fn(),
  findById: jest.fn().mockResolvedValue({
    id: '1',
    name: 'p1',
    price: 10
  }),
  update: jest.fn(),
  findAll: jest.fn(),
})

const mockSut = () => {
  const repository = mockRepository()
  return {
    sut: new FindProductUseCase(repository),
    repository
  }
}

describe('Unit Test Find Product UseCase', () => {
  it ('should find a product', async () => {
    const output = await mockSut().sut.execute({
      id: '1'
    })

    const outputExpected = {
      id: '1',
      name: 'p1',
      price: 10
    }

    expect(output).toEqual(outputExpected)
  })

  it ('should throw an error when product not found', async () => {
    const { sut, repository } = mockSut()
    repository.findById.mockResolvedValueOnce(null)

    await expect(sut.execute({ id: '1' })).rejects.toThrowError('Product not found')
  })
})