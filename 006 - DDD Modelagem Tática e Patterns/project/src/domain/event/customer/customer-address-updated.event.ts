import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

export default class CustomerAddressUpdatedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: {
    customerId: string;
    name: string;
    address: Address;
  };

  constructor(eventData: {
    customerId: string;
    name: string;
    address: Address;
  }) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
