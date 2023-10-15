import Notification from "../notification/notification";

export default abstract class Entity {
  protected _id: string;
  protected _notification: Notification;

  constructor(id: string) {
    this._id = id;
    this._notification = new Notification();
  }
}
