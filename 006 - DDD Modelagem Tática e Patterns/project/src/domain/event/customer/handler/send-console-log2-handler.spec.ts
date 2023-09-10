import CustomerCreatedEvent from "../customer-created.event";
import SendConsoleLog2Handler from "./send-console-log2.handler";

describe('SendConsoleLog2Handler', () => {
  it('should be defined', () => {
    expect(new SendConsoleLog2Handler()).toBeDefined();
  });

  it('should call console.log with correct values', () => {
    const handler = new SendConsoleLog2Handler();
    const consoleSpy = jest.spyOn(console, 'log');

    handler.handle(new CustomerCreatedEvent({}));

    expect(consoleSpy).toHaveBeenCalledWith('Esse é o segundo console.log do evento: CustomerCreated');
  })
})