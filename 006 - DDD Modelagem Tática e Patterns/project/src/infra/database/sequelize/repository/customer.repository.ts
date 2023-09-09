import Address from "../../../../domain/entity/address"
import Customer from "../../../../domain/entity/customer"
import CustomerRepositoryInterface from "../../../../domain/repository/customer-repository.interface"
import CustomerModel from "../model/customer.model"

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      city: entity.Address.city,
      zipCode: entity.Address.zipCode,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    })
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      city: entity.Address.city,
      zipCode: entity.Address.zipCode,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    }, {
      where: { id: entity.id }
    })
  }

  async findById(id: string): Promise<Customer> {
    let customerModel: CustomerModel

    try {
      customerModel = await CustomerModel.findOne({ where: { id } })
    } catch {
      throw new Error('Customer not found')
    }

    const customer = new Customer (String(customerModel.id), customerModel.name)
    customer.changeAddress(new Address(
      customerModel.street,
      customerModel.number,
      customerModel.city,
      customerModel.zipCode
    ))
    customer.addRewardPoints(customerModel.rewardPoints)

    if (customerModel.active) customer.activate()

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll()

    return customers.map(customer => {
      const customerEntity = new Customer (String(customer.id), customer.name)
      customerEntity.changeAddress(new Address(
        customer.street,
        customer.number,
        customer.city,
        customer.zipCode
      ))
      customerEntity.addRewardPoints(customer.rewardPoints)
      if (customer.active) customerEntity.activate()

      return customerEntity;
    })
  }
}
