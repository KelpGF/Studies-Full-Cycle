import AggregateRoot from "../../../shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../shared/domain/entity/base.entity";
import IdVo from "../../../shared/domain/value-object/id.vo";

type ProductEntityProps = {
  id?: IdVo;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class ProductEntity extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _description: string;
  private _purchasePrice: number;
  private _stock: number;

  constructor(props: ProductEntityProps) {
    super(props.id);
    this._name = props.name;
    this._description = props.description;
    this._purchasePrice = props.purchasePrice;
    this._stock = props.stock;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get purchasePrice(): number {
    return this._purchasePrice;
  }

  get stock(): number {
    return this._stock;
  }

  changeName(name: string): void {
    this._name = name;
    this.changed();
  }

  changeDescription(description: string): void {
    this._description = description;
    this.changed();
  }

  changePurchasePrice(purchasePrice: number): void {
    this._purchasePrice = purchasePrice;
    this.changed();
  }

  changeStock(stock: number): void {
    this._stock = stock;
    this.changed();
  }
}