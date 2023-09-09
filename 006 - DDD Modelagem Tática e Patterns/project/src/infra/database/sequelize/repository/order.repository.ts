import Order from "../../../../domain/entity/order"
import OrderRepositoryInterface from "../../../../domain/repository/order-repository.interface"
import OrderModel from "../model/order.model"

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
      include: OrderModel.associations.items
    })
  }

  async update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.")
  }

  async findById(id: string): Promise<Order> {
    throw new Error("Method not implemented.")
  }

  async findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.")
  }
}
