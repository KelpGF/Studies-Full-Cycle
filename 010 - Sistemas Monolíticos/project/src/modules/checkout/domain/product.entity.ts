import AggregateRoot from "../../shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../shared/domain/entity/base.entity";
import IdVo from "../../shared/domain/value-object/id.vo";

type ProductProps = {
  id?: IdVo;
  name: string;
  description: string;
  salesPrice: number;
}

export default class ProductEntity extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _description: string;
  private _salesPrice: number;

  constructor(props: ProductProps) {
    super(props.id);
    this._name = props.name;
    this._description = props.description;
    this._salesPrice = props.salesPrice;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get salesPrice(): number {
    return this._salesPrice;
  }
}
