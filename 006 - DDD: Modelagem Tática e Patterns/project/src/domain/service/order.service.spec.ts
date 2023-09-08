import Customer from "../entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service"

describe("OrderService", () => {
  it ("should place an order", () => {
    const customer = new Customer('c1', 'Kelvin Gomes')
    const item1 = new OrderItem('i1', 'p1', 'Item 1', 10, 3)

    const order = OrderService.placeOrder(customer, [item1])

    expect(customer.rewardPoints).toBe(15)
    expect(order.total()).toBe(30)
  })

  it ("should calculate tha total of all orders", () => {
    const item1 = new OrderItem('i1', 'p1', 'Item 1', 10, 3)
    const item2 = new OrderItem('i2', 'p2', 'Item 2', 20, 1)

    const order1 = new Order('o1', 'c1', [item1, item2])
    const order2 = new Order('o2', 'c2', [item2, item2])

    const total = OrderService.calculateOrdersTotal([order1, order2])

    expect(total).toBe(90)
  })
})