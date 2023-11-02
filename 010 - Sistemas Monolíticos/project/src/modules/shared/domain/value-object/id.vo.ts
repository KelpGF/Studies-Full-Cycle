import { v4 as uuid } from "uuid";
import ValueObject from "./value-object.interface";

export default class IdVo implements ValueObject {
  private readonly _value: string;

  constructor(value?: string) {
    this._value = value || uuid();
  }

  get value(): string {
    return this._value;
  }
}
