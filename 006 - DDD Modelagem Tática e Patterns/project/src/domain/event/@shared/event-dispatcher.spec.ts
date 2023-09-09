import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
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
})
