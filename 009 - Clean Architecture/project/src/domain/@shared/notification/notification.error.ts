import { NotificationErrorProps } from "./notification";

export default class NotificationError extends Error {
    constructor(errors: NotificationErrorProps[]) {
        super();
    }
}