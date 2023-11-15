import BaseEntity from "../../../shared/domain/entity/base.entity"

type InvoiceItemEntityProps = {
  name: string
  price: number
}

export default class InvoiceItemEntity extends BaseEntity {
  private _name: string
  private _price: number

  constructor(props: InvoiceItemEntityProps) {
    super()
    this._name = props.name
    this._price = props.price
  }

  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price
  }
}