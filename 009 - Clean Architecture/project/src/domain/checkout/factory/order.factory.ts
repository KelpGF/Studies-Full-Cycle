import Order from "../entity/order";
import OrderItem from "../entity/order_item";

type OrderFactoryProps = {
  id: string
  customerId: string
  items: {
    id: string
    productId: string
    description: string
    price: number
    quantity: number
  }[]
};

export default class OrderFactory {
  static create(props: OrderFactoryProps): Order {
    const orderItems = props.items.map((item) => 
      new OrderItem(
        item.id,
        item.productId,
        item.description,
        item.price,
        item.quantity
    ))

    return new Order(props.id, props.customerId, orderItems)
  }
}