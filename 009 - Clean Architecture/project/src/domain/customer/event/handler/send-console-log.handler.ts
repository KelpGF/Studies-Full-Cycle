import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressUpdatedEvent from "../customer-address-updated.event";

export default class SendConsoleLogHandler implements EventHandlerInterface {
  handle(event: CustomerAddressUpdatedEvent): void {
    const data = event.eventData;
    const addressString = `${data.address.street}, ${data.address.number}, ${data.address.city}, ${data.address.zipCode}`;

    console.log(`Endereço do cliente: ${data.customerId}, ${data.name} alterado para: ${addressString}`);
  }
}
