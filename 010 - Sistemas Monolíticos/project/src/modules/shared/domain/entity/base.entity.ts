import IdVo from "../value-object/id.vo";

export default class BaseEntity {
  protected _id: IdVo;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  constructor(id?: IdVo) {
    this._id = id || new IdVo();
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id(): IdVo {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  changed(): void {
    this._updatedAt = new Date();
  }
}
