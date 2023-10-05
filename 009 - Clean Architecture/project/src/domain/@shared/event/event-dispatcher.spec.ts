import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("EventDispatcher", () => {
  it("should register event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("event-name", eventHandler);

    expect(eventDispatcher.getEventHandlers["event-name"]).toEqual([
      eventHandler,
    ]);
  });

  it("should unregister event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("event-name", eventHandler);
    expect(eventDispatcher.getEventHandlers["event-name"]).toEqual([
      eventHandler,
    ]);

    eventDispatcher.unregister("event-name", eventHandler);
    expect(eventDispatcher.getEventHandlers["event-name"]).toEqual([]);
  })

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("event-name", eventHandler);
    expect(eventDispatcher.getEventHandlers["event-name"]).toEqual([
      eventHandler,
    ]);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers).toEqual({});
  })

  it("should notify event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product Name",
      price: 10
    });
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toEqual([
      eventHandler,
    ]);

    eventDispatcher.notify(productCreatedEvent);

    expect(eventHandlerSpy).toHaveBeenCalledWith(productCreatedEvent);
  })
})
