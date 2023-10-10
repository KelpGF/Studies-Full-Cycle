import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { OutputCreateCustomerDTO } from "../create/create.customer.dto";
import { InputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepositoryInterface) {}

  async execute(input: InputUpdateCustomerDto): Promise<OutputCreateCustomerDTO> {
    const customer = await this.customerRepository.findById(input.id);
    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.city,
        input.address.zip
      )
    )

    await this.customerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        city: customer.Address.city,
        zipCode: customer.Address.zipCode
      }
    };
  }
}