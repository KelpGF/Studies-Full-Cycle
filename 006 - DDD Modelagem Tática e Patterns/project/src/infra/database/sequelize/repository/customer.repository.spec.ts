import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../model/customer.model"
import Customer from "../../../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../../../domain/entity/address";

describe('CustomerRepository', () => {
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

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('1', 'c1')
    customer.changeAddress(new Address('street', 1, 'city', 'zipCode'))

    await customerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: +customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      city: customer.Address.city,
      zipCode: customer.Address.zipCode,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    })
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('1', 'c1')
    customer.changeAddress(new Address('street', 1, 'city', 'zipCode'))

    await customerRepository.create(customer)

    customer.changeName('c01')
    customer.changeAddress(new Address('street1', 1, 'city01', 'zipCode'))
    customer.activate()

    await customerRepository.update(customer)

    const customerUpdated = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerUpdated.toJSON()).toStrictEqual({
      id: +customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      city: customer.Address.city,
      zipCode: customer.Address.zipCode,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    })
  })

  it('should throw an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository()

    expect(customerRepository.findById('1')).rejects.toThrowError('Customer not found')
  })

  it('should find a customer by id', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('1', 'c1')
    customer.changeAddress(new Address('street', 1, 'city', 'zipCode'))

    await customerRepository.create(customer)

    const customerFound = await customerRepository.findById('1')

    expect(customer).toStrictEqual(customerFound)
  })

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository()
    const customer1 = new Customer('1', 'c1')
    customer1.changeAddress(new Address('street', 1, 'city', 'zipCode'))
    customer1.activate()
    customer1.addRewardPoints(10)
    const customer2 = new Customer('2', 'p2')
    customer2.changeAddress(new Address('street2', 2, 'city2', 'zipCode2'))

    Promise.all([
      customerRepository.create(customer1),
      customerRepository.create(customer2)
    ])

    const customersFound = await customerRepository.findAll()
    const customers = [customer1, customer2]

    expect(customersFound).toEqual(customers)
  })
})
