import EventHandlerInterface from "../../@shared/event-handler.interface";

export default class SendConsoleLog2Handler implements EventHandlerInterface {
  handle(event: any): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
