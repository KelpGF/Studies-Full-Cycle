package events

import "errors"

var ErrHandlerAlreadyRegistred = errors.New("handler already registred")
var ErrNoHandlerRegistred = errors.New("no handler registred")

type EventDispatcher struct {
	handlers map[string][]EventHandlerInterface
}

func NewEventDispatcher() *EventDispatcher {
	return &EventDispatcher{
		handlers: make(map[string][]EventHandlerInterface),
	}
}

func (eventDispatcher *EventDispatcher) Register(eventName string, eventHandler EventHandlerInterface) error {
	if _, ok := eventDispatcher.handlers[eventName]; ok {
		for _, handler := range eventDispatcher.handlers[eventName] {
			if handler == eventHandler {
				return ErrHandlerAlreadyRegistred
			}
		}
	}

	eventDispatcher.handlers[eventName] = append(eventDispatcher.handlers[eventName], eventHandler)
	return nil
}
func (eventDispatcher *EventDispatcher) Remove(eventName string, eventHandler EventHandlerInterface) error {
	if _, ok := eventDispatcher.handlers[eventName]; ok {
		for i, handler := range eventDispatcher.handlers[eventName] {
			if handler == eventHandler {
				eventDispatcher.handlers[eventName] = append(eventDispatcher.handlers[eventName][:i], eventDispatcher.handlers[eventName][i+1:]...)
			}
		}
	}

	return nil
}
func (eventDispatcher *EventDispatcher) Clear() error {
	eventDispatcher.handlers = make(map[string][]EventHandlerInterface)

	return nil
}
func (eventDispatcher *EventDispatcher) Has(eventName string, eventHandler EventHandlerInterface) bool {
	if _, ok := eventDispatcher.handlers[eventName]; ok {
		for _, handler := range eventDispatcher.handlers[eventName] {
			if handler == eventHandler {
				return true
			}
		}
	}

	return false
}
func (eventDispatcher *EventDispatcher) Dispatch(event EventInterface) error {
	handlers, ok := eventDispatcher.handlers[event.GetName()]
	if !ok {
		return ErrNoHandlerRegistred
	}

	for _, handler := range handlers {
		handler.Handler(event)
	}
	return nil
}
