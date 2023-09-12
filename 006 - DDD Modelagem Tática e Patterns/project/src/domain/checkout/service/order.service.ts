import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default class OrderService {
  public static placeOrder(customer: Customer, items: OrderItem[]): Order {
    const order = new Order("o1", customer.id, items)
    customer.addRewardPoints(order.total() / 2)
    return order
  }

  public static calculateOrdersTotal(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0)
  }
}