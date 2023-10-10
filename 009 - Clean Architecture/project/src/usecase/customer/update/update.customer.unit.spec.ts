import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "Kelvin",
  new Address("street", 10, "city", "zip")
);

const input = {
  id: '1',
  name: "Kelvin Updated",
  address: {
    street: "street updated",
    number: 10,
    city: "city updated",
    zip: "zip updated",
  },
};

const mockRepository = () => ({
  create: jest.fn(),
  findById: jest.fn().mockResolvedValue(customer),
  update: jest.fn(),
  findAll: jest.fn(),
});

describe("UpdateCustomer", () => {
  it('should update a customer', async () => {
    const repository = mockRepository();
    const usecase = new UpdateCustomerUseCase(repository);

    await usecase.execute(input);

    expect(repository.findById).toHaveBeenCalledWith(input.id);
    expect(repository.update).toHaveBeenCalledWith(customer);
  });
});
