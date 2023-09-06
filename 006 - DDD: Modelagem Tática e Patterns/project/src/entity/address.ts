export default class Address {
  private readonly _street: string;
  private readonly _number: number;
  private readonly _city: string;
  private readonly _zipCode: string;

  constructor(
    street: string,
    number: number,
    city: string,
    zipCode: string
  ) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._zipCode = zipCode;
    this.validate();
  }

  validate() {
    if (!this._street) {
      throw new Error("Street is required");
    }
    if (!this._number) {
      throw new Error("Number is required");
    }
    if (!this._city) {
      throw new Error("City is required");
    }
    if (!this._zipCode) {
      throw new Error("ZipCode is required");
    }
  }

  toString() {
    return `${this._street}, ${this._number} - ${this._city}/${this._zipCode}`;
  }
}