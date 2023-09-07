export default class OrderItem {
  private _price: number;
  private _quantity: number;

  constructor(price: number, quantity: number) {
    this._price = price;
    this._quantity = quantity;
  }

  total(): number {
    return this._price * this._quantity;
  }
}
