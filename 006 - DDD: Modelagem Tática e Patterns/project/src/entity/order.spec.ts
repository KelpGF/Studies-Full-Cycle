import Order from "./order"
import OrderItem from "./order_item"

describe("Order Entity", () => {
  it ("should throw error when id is empty", () => {
    expect(() => new Order("", "123", [])).toThrowError("Id is required")
  })

  it ("should throw error when customerId is empty", () => {
    expect(() => new Order("123", "", [])).toThrowError("Customer Id is required")
  })

  it ("should throw error when items list is empty", () => {
    expect(() => new Order("123", "123", [])).toThrowError("Items quantity must be greater than 0")
  })

  it ("should calculate total", () => {
    const item = new OrderItem(10, 2)
    const order = new Order("o1", "c1", [item])
    expect(order.total()).toBe(20)

    const item2 = new OrderItem(20, 2)
    const order2 = new Order("o2", "c2", [item, item2])
    expect(order2.total()).toBe(60)
  })
})
