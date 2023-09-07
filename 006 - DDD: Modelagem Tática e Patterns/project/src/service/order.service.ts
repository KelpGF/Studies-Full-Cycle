import Order from "../entity/order";

export default class OrderService {
  public static calculateOrdersTotal(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0)
  }
}