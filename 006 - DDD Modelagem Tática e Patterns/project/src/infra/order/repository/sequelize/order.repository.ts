import Order from "../../../../domain/checkout/entity/order"
import OrderItem from "../../../../domain/checkout/entity/order_item"
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface"
import OrderItemModel from "./order-item.model"
import OrderModel from "./order.model"

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customerId: entity.customerId,
      total: entity.total(),
      items: entity.items.map(item => ({
        id: item.id,
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    }, {
      include: OrderItemModel
    })
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update({
      customerId: entity.customerId,
      total: entity.total(),
    }, {
      where: { id: entity.id },
    })

    await Promise.all(entity.items.map(item => {
      return OrderItemModel.upsert({
        id: item.id,
        orderId: entity.id,
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })
    }))
  }

  async findById(id: string): Promise<Order> {
    const orderModel = await OrderModel.findByPk(id, { include: OrderItemModel })

    return new Order(
      String(orderModel.id),
      String(orderModel.customerId),
      orderModel.items.map(item => new OrderItem(
        String(item.id),
        String(item.productId),
        item.name,
        item.price,
        item.quantity
      ))
    )
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({ include: OrderItemModel })

    return ordersModel.map(orderModel => new Order(
      String(orderModel.id),
      String(orderModel.customerId),
      orderModel.items.map(item => new OrderItem(
        String(item.id),
        String(item.productId),
        item.name,
        item.price,
        item.quantity
      ))
    ))
  }
}
