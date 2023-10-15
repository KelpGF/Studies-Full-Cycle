import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super(id);
    this._name = name;
    this._price = price;
    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }

  validate() {
    if (!this._id) {
      this._notification.addError({
        context: "product",
        message: "Id is required",
      });
    }
    if (!this._name) {
      this._notification.addError({
        context: "product",
        message: "Name is required",
      });
    }
    if (this._price < 0) {
      this._notification.addError({
        context: "product",
        message: "Price must be positive",
      });
    }

    if (this._notification.hasErrors()) {
      throw new NotificationError(this._notification.errors());
    }
  }
}