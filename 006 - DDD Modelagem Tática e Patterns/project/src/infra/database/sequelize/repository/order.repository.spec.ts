import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../model/customer.model"
import OrderModel from "../model/order.model"
import OrderItemModel from "../model/order-item.model"
import ProductModel from "../model/product.model"
import CustomerRepository from "./customer.repository"
import Customer from "../../../../domain/entity/customer"
import Address from "../../../../domain/entity/address"
import ProductRepository from "./product.repository"
import Product from "../../../../domain/entity/product"
import OrderItem from "../../../../domain/entity/order_item"
import Order from "../../../../domain/entity/order"
import OrderRepository from "./order.repository"

describe('OrderRepository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('should create order with items', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('1', 'Kelps')
    const address = new Address('Street 1', 1, 'City 1', '12345678')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem('1', product.id, product.name, product.price, 2)
    const order = new Order('1', customer.id, [orderItem])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findByPk(order.id, { include: OrderItemModel })

    expect(orderModel.toJSON()).toStrictEqual({
      id: +order.id,
      customerId: +order.customerId,
      total: order.total(),
      items: [{
        id: +orderItem.id,
        orderId: +order.id,
        productId: +orderItem.productId,
        name: orderItem.name,
        price: orderItem.price,
        quantity: orderItem.quantity
      }]
    })
  })
})
