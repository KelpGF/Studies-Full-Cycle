export default class OrderItem {
  private readonly _id : string;
  private readonly _productId: string;
  private readonly _name: string;
  private _price: number;
  private _quantity: number;

  constructor(id: string, productId: string, name: string, price: number, quantity: number) {
    this._id = id;
    this._productId = productId;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
  }

  get quantity(): number {
    return this._quantity;
  }

  total(): number {
    return this._price * this._quantity;
  }
}
