import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends Entity {
  private _name: string;
  private _address: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super(id);
    this._name = name;
    this.validate();

    if (this._notification.hasErrors()) {
      throw new NotificationError(this._notification.errors());
    }
  }

  validate() {
    if (!this._id) {
      this._notification.addError({
        context: "customer",
        message: "Id is required",
      });
    }
    if (!this._name) {
      this._notification.addError({
        context: "customer",
        message: "Name is required",
      });
    }
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get Address() {
    return this._address;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  isActive() {
    return this._active;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
    this.validate();
  }

  activate() {
    if (!this._address) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
