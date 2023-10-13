import ListProductUseCase from "./list.product.usecase"

const mockRepository = () => ({
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn().mockResolvedValue([
    {
      id: '1',
      name: 'p1',
      price: 10
    },
    {
      id: '2',
      name: 'p2',
      price: 20
    },
  ]),
})

const mockSut = () => {
  const repository = mockRepository()
  return {
    sut: new ListProductUseCase(repository),
    repository
  }
}

describe('Unit Test List Product UseCase', () => {
  it ('should list a product', async () => {
    const { sut, repository } = mockSut()
    const output = await sut.execute({})

    expect(repository.findAll).toHaveBeenCalledTimes(1)
    expect(output).toEqual({
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