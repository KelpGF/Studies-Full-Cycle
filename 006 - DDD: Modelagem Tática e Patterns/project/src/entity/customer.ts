class Customer {
  private _id: string;
  private _name: string;
  private _address: string;
  private _active: boolean = true;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
  }

  changeName(name: string) {
    this._name = name;
  }

  activate() {
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}
