import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../../customer/value-object/address";
import CustomerAddressUpdatedEvent from "./customer-address-updated.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLogHandler from "./handler/send-console-log.handler";
import SendConsoleLog1Handler from "./handler/send-console-log1.handler";
import SendConsoleLog2Handler from "./handler/send-console-log2.handler";

describe('Customer Events', () => {
  it('should emit CustomerCreatedEvent', () => {
    const dispatcher = new EventDispatcher();
    const customerCreatedEvent = new CustomerCreatedEvent({});

    const sendLog1EventHandler = new SendConsoleLog1Handler();
    const sendLog1EventHandlerSpy = jest.spyOn(sendLog1EventHandler, 'handle');
    dispatcher.register(customerCreatedEvent.constructor.name, sendLog1EventHandler)
    const sendLog2EventHandler = new SendConsoleLog2Handler();
    const sendLog2EventHandlerSpy = jest.spyOn(sendLog2EventHandler, 'handle');
    dispatcher.register(customerCreatedEvent.constructor.name, sendLog2EventHandler)

    dispatcher.notify(customerCreatedEvent);

    expect(sendLog1EventHandlerSpy).toHaveBeenCalledTimes(1);
    expect(sendLog2EventHandlerSpy).toHaveBeenCalledTimes(1);
  })

  it('should emit CustomerAddressUpdatedEvent', () => {
    const dispatcher = new EventDispatcher();
    const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent({
      customerId: '1',
      name: 'Kelps',
      address: new Address('Rua 1', 123, 'Centro', '1234567')
    })

    const sendLogEventHandler = new SendConsoleLogHandler();
    const sendLogEventHandlerSpy = jest.spyOn(sendLogEventHandler, 'handle');
    dispatcher.register(customerAddressUpdatedEvent.constructor.name, sendLogEventHandler)

    dispatcher.notify(customerAddressUpdatedEvent);

    expect(sendLogEventHandlerSpy).toHaveBeenCalledWith(customerAddressUpdatedEvent);
  })
})
