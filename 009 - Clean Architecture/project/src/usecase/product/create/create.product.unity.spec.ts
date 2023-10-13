import CreateProductUseCase from "./create.product.usecase"

const mockRepository = () => ({
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
})

const mockInput = () => ({
  name: 'p1',
  price: 10
})

const mockSut = () => new CreateProductUseCase(mockRepository())

describe('Unit Test Create Product UseCase', () => {
  it ('should create a product', async () => {
    const productRepository = mockRepository();
    const input = mockInput();

    const output = await mockSut().execute(input)

    const outputExpected = {
      id: expect.any(String),
      name: input.name,
      price: input.price
    }

    expect(output).toEqual(outputExpected)
  })

  it ('should throw an error when the name is empty', async () => {
    const productRepository = mockRepository();
    const input = mockInput();
    input.name = ''

    await expect(mockSut().execute(input)).rejects.toThrowError('Name is required')
  })

  it ('should throw an error when the price is less than 0', async () => {
    const productRepository = mockRepository();
    const input = mockInput();

    input.price = -1

    await expect(mockSut().execute(input)).rejects.toThrowError('Price is required')
  })
})