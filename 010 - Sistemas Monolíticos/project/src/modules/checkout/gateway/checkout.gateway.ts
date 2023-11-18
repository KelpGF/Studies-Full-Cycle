import OrderEntity from "../domain/order.entity"

export default interface CheckoutGatewayInterface {
  addOrder(order: OrderEntity): Promise<void>
  findOrderById(orderId: string): Promise<OrderEntity | null>
}