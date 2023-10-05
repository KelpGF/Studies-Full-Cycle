import CreateCustomerUseCase from "./create.customer.usecase"

const input = {
  name: 'Kelvin',
  address: {
    street: 'Rua 1',
    number: 123,
    city: 'Cidade 1',
    zipCode: '12345678'
  }
}

const mockRepository = () => ({
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
})

describe('Unit Test Create Customer UseCase', () => {
  it ('should create a customer', async () => {
    const customerRepository = mockRepository()

    const usecase = new CreateCustomerUseCase(customerRepository)

    const outputExpected = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zipCode: input.address.zipCode
      }
    }

    const output = await usecase.execute(input)

    expect(output).toEqual(outputExpected)
  })

  it ('should throw an error when the name is empty', async () => {
    const customerRepository = mockRepository()
    const usecase = new CreateCustomerUseCase(customerRepository)
    input.name = ''

    await expect(usecase.execute(input)).rejects.toThrowError('Name is required')
  })

  it ('should throw an error when the address.street is empty', async () => {
    const customerRepository = mockRepository()
    const usecase = new CreateCustomerUseCase(customerRepository)
    input.address.street = null

    await expect(usecase.execute(input)).rejects.toThrowError('Street is required')
  })
})
