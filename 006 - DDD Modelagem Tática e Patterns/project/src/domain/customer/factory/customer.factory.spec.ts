import Address from "../value-object/address"
import CustomerFactory from "./customer.factory"

describe('Customer Factory', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('c1')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('c1')
    expect(customer.isActive()).toBe(false)
    expect(customer.rewardPoints).toBe(0)
    expect(customer.Address).toBeUndefined()
  })

  it('should create a customer with address', () => {
    const address = new Address('street', 1, 'city', 'zipCode')
    const customer = CustomerFactory.createWithAddress('c1', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('c1')
    expect(customer.isActive()).toBe(false)
    expect(customer.rewardPoints).toBe(0)
    expect(customer.Address).toBeDefined()
    expect(customer.Address.street).toBe('street')
    expect(customer.Address.number).toBe(1)
    expect(customer.Address.city).toBe('city')
    expect(customer.Address.zipCode).toBe('zipCode')
  })
})
