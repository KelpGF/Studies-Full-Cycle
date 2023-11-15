import AggregateRoot from "../../../shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../../shared/domain/entity/base.entity"
import AddressVO from "../../../shared/domain/value-object/address.vo"
import InvoiceItemEntity from "./invoice-item.entity"

type InvoiceEntityProps = {
  name: string
  document: string
  address: AddressVO
  items: InvoiceItemEntity[]
}

export default class InvoiceEntity extends BaseEntity implements AggregateRoot {
  private _name: string
  private _document: string
  private _address: AddressVO
  private _items: InvoiceItemEntity[]

  constructor(props: InvoiceEntityProps) {
    super()
    this._name = props.name
    this._document = props.document
    this._address = props.address
    this._items = props.items
  }

  get name(): string {
    return this._name
  }

  get document(): string {
    return this._document
  }

  get address(): AddressVO {
    return this._address
  }

  get items(): InvoiceItemEntity[] {
    return this._items
  }

  get total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0)
  }
}