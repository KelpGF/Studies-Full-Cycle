import Order from "../entity/order"
import OrderFactory from "./order.factory"

describe('Order Factory', () => {
  it ('should create an order', () => {
    const orderProps = {
      id: 'p1',
      customerId: 'c1', 
      items: [
        {
          id: 'i1',
          productId: 'p1',
          description: 'desc1',
          price: 10,
          quantity: 1
        }
      ]
    }
    const order = OrderFactory.create(orderProps)

    expect(order).toBeInstanceOf(Order)
    expect(order.id).toBe(orderProps.id)
    expect(order.customerId).toBe(orderProps.customerId)
    expect(order.items).toHaveLength(1)
  })
})
