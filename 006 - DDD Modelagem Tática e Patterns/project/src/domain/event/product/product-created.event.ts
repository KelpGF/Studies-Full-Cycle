import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}