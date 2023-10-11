import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "Kelvin1",
  new Address("street 1", 10, "city 1", "zip1")
);
const customer2 = CustomerFactory.createWithAddress(
  "Kelvin2",
  new Address("street 2", 20, "city 2", "zip2")
);

const mockRepository = () => ({
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn().mockResolvedValue([customer1, customer2]),
});

describe("ListCustomer", () => {
  it("should list all customers", async () => {
    const repository = mockRepository();
    const usecase = new ListCustomerUseCase(repository);

    const output = await usecase.execute({});

    expect(repository.findAll).toHaveBeenCalled();
    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.Address.street);
    expect(output.customers[0].address.number).toBe(customer1.Address.number);
    expect(output.customers[0].address.city).toBe(customer1.Address.city);
    expect(output.customers[0].address.zipCode).toBe(customer1.Address.zipCode);
    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.Address.street);
    expect(output.customers[1].address.number).toBe(customer2.Address.number);
    expect(output.customers[1].address.city).toBe(customer2.Address.city);
    expect(output.customers[1].address.zipCode).toBe(customer2.Address.zipCode);
  });
})
