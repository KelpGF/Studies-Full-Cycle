import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address: Address;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (!this._id) {
      throw new Error("Id is required");
    }
    if (!this._name) {
      throw new Error("Name is required");
    }
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  isActive() {
    return this._active;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
    this.validate();
  }

  activate() {
    if (!this._address) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}
