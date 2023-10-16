import Notification, { NotificationErrorProps } from "../notification/notification";

export default abstract class Entity {
  protected _id: string;
  protected _notification: Notification;

  constructor(id: string) {
    this._id = id;
    this._notification = new Notification();
  }

  addNotificationError(notification: NotificationErrorProps): void {
    this._notification.addError(notification);
  }
}
