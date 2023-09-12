import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export default class SendConsoleLog1Handler implements EventHandlerInterface {
  handle(event: any): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
