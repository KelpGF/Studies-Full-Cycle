import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Find Customer UseCase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it ('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const customer = new Customer('123', 'Kelvin')
    const address = new Address('Rua 1', 123, 'Cidade 1', '12345678')
    customer.changeAddress(address)
    await customerRepository.create(customer)

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
});