import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer('123', 'Kelvin')
const address = new Address('Rua 1', 123, 'Cidade 1', '12345678')
customer.changeAddress(address)
const mockRepository = () => ({
  findById: jest.fn().mockResolvedValue(customer),
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
})

describe('Unit Test Find Customer UseCase', () => {
  it ('should find a customer', async () => {
    const customerRepository = mockRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const input = { id: '123' }
    const output = {
      id: '123',
      name: 'Kelvin',
      address: {
        street: 'Rua 1',
        number: 123,
        city: 'Cidade 1',
        zipCode: '12345678'
      }
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })

  it ('should throw an error when customer not found', async () => {
    const customerRepository = mockRepository()
    customerRepository.findById.mockRejectedValueOnce(new Error('Customer not found'))

    const usecase = new FindCustomerUseCase(customerRepository)

    const input = { id: '123' }

    await expect(usecase.execute(input)).rejects.toThrowError('Customer not found')
  })
});