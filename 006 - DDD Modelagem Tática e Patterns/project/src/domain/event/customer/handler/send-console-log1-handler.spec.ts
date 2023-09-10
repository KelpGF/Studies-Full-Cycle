import CustomerCreatedEvent from "../customer-created.event";
import SendConsoleLog1Handler from "./send-console-log1.handler";

describe('SendConsoleLog1Handler', () => {
  it('should be defined', () => {
    expect(new SendConsoleLog1Handler()).toBeDefined();
  });

  it('should call console.log with correct values', () => {
    const handler = new SendConsoleLog1Handler();
    const consoleSpy = jest.spyOn(console, 'log');

    handler.handle(new CustomerCreatedEvent({}));

    expect(consoleSpy).toHaveBeenCalledWith('Esse é o primeiro console.log do evento: CustomerCreated');
  })
})