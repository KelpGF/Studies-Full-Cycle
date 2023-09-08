import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
  }

  total(): number {
    return this._items.reduce((total, item) => total + item.total(), 0);
  }

  validate(): boolean {
    if (!this._id) throw new Error("Id is required");
    if (!this._customerId) throw new Error("Customer Id is required");
    if (this._items.length === 0) throw new Error("Items quantity must be greater than 0");
    if (this._items.some(item => item.quantity <= 0)) throw new Error("Item quantity must be greater than 0");
    return true;
  }
}
