import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventName: string, eventHandler: EventInterface): void;
  unregister(eventName: string, eventHandler: EventInterface): void;
  unregisterAll(): void;
}
