import AggregateRoot from "../../shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../shared/domain/entity/base.entity";
import IdVo from "../../shared/domain/value-object/id.vo";

type ClientProps = {
  id?: IdVo;
  name: string;
  email: string;
  address: string;
}

export default class ClientEntity extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: string;
  private _address: string;

  constructor(props: ClientProps) {
    super(props.id);
    this._name = props.name;
    this._email = props.email;
    this._address = props.address;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get address(): string {
    return this._address;
  }
}