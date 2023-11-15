import ValueObject from "./value-object.interface";

type AddressVOProps = {
  street: string
  number: string
  city: string
  state: string
  complement: string
  zipCode: string
}

export default class AddressVO implements ValueObject {
  private _street: string
  private _number: string
  private _city: string
  private _state: string
  private _complement: string
  private _zipCode: string

  constructor(props: AddressVOProps) {
    this._street = props.street
    this._number = props.number
    this._city = props.city
    this._state = props.state
    this._complement = props.complement
    this._zipCode = props.zipCode
  }

  get street(): string {
    return this._street
  }

  get number(): string {
    return this._number
  }

  get city(): string {
    return this._city
  }

  get state(): string {
    return this._state
  }

  get complement(): string {
    return this._complement
  }

  get zipCode(): string {
    return this._zipCode
  }
}
