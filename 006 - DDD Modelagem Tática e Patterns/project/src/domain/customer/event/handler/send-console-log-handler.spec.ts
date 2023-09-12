import Address from "../../../customer/value-object/address";
import CustomerAddressUpdatedEvent from "../customer-address-updated.event";
import SendConsoleLogHandler from "./send-console-log.handler";

describe('SendConsoleLogHandler', () => {
  it('should be defined', () => {
    expect(new SendConsoleLogHandler()).toBeDefined();
  });

  it('should call console.log with correct values', () => {
    const handler = new SendConsoleLogHandler();
    const consoleSpy = jest.spyOn(console, 'log');

    handler.handle(
      new CustomerAddressUpdatedEvent({
        customerId: '1',
        name: 'Teste',
        address: new Address(
          'Rua Teste',
          123,
          'Cidade Teste',
          '12345678'
        )
      })
    );

    expect(consoleSpy).toHaveBeenCalledWith('Endereço do cliente: 1, Teste alterado para: Rua Teste, 123, Cidade Teste, 12345678');
  })
})