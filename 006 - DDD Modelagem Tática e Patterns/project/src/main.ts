import Customer from "./domain/entity/customer";
import Address from "./domain/entity/address";
import OrderItem from "./domain/entity/order_item";
import Order from "./domain/entity/order";

const customer = new Customer('123', 'Kelvin Gomes')
const address = new Address('Rua 1', 123, 'Centro', '12345-123')
customer.changeAddress(address)
customer.activate()

const item1 = new OrderItem('123', 'p1', 'Item 1', 10, 3)
const item2 = new OrderItem('123', 'p2', 'Item 2', 15, 1)
const order = new Order('1', customer.id, [item1, item2])
