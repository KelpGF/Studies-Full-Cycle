import Address from "./address"
import Customer from "./customer"

describe("Customer Entity", () => {
  it ("should throw error when id is empty", () => {
    expect(() => new Customer("", "John Doe")).toThrowError("Id is required")
  })

  it ("should throw error when name is empty", () => {
    expect(() => new Customer("1", "")).toThrowError("Name is required")
  })

  it ("should change name", () => {
    // Arrange
    const customer = new Customer("1", "John Doe")
    // Act
    customer.changeName("Jane Doe")
    // Assert
    expect(customer.name).toBe("Jane Doe")
  })

  it ("should throw when change name to a invalid name", () => {
    expect(() => new Customer("1", "John Doe").changeName("")).toThrowError("Name is required")
  })

  it ("should activate customer", () => {
    const customer = new Customer("1", "John Doe")
    const address = new Address("Street 1", 10, "Fortaleza", "CE")
    customer.changeAddress(address)

    customer.activate()

    expect(customer.isActive()).toBeTruthy()
  })

  it ("should throw error when address is undefine when you activate a customer", () => {
    expect(() => new Customer("1", "John Doe").activate()).toThrowError("Address is mandatory to activate a customer")
  })

  it ("should deactivate customer", () => {
    const customer = new Customer("1", "John Doe")

    customer.deactivate()

    expect(customer.isActive()).toBeFalsy()
  })
})
