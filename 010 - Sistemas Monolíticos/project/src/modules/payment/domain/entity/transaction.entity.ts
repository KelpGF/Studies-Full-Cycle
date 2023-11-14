import AggregateRoot from "../../../shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../shared/domain/entity/base.entity";
import IdVo from "../../../shared/domain/value-object/id.vo"

type TransactionProps = {
  id?: IdVo;
  amount: number;
  orderId: IdVo;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class TransactionEntity extends BaseEntity implements AggregateRoot {
  private _amount: number;
  private _orderId: IdVo;
  private _status?: string;

  constructor(props: TransactionProps) {
    super(props.id);
    this._amount = props.amount;
    this._orderId = props.orderId;
    this._status = props.status || "pending";
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
    this.validate();
  }

  get id(): IdVo {
    return this._id;
  }

  get amount(): number {
    return this._amount;
  }

  get orderId(): IdVo {
    return this._orderId;
  }

  get status(): string {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  validate(): void {
    if (this.amount <= 0) throw new Error("Amount must be greater than 0");
  }

  approve(): void {
    this._status = "approved";
  }

  decline(): void {
    this._status = "declined";
  }

  process(): void {
    if (this.amount >= 100) {
      this.approve();
    } else {
      this.decline();
    }
  }
}
