import Customer from "./entity/customer";
import Address from "./entity/address";
import OrderItem from "./entity/order_item";
import Order from "./entity/order";

const customer = new Customer('123', 'Kelvin Gomes')
const address = new Address('Rua 1', 123, 'Centro', '12345-123')
customer.changeAddress(address)
customer.activate()

const item1 = new OrderItem('123', 'Item 1', 10)
const item2 = new OrderItem('123', 'Item 2', 15)
const order = new Order('1', customer.id, [item1, item2])
