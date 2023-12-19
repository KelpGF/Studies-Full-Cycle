package events

import "time"

type EventInterface interface {
	GetName() string
	GetDateTime() time.Time
	GetPayload() interface{}
	SetPayload(data interface{})
}

type EventHandlerInterface interface {
	Handler(event EventInterface)
}

type EventDispatcherInterface interface {
	Register(eventName string, eventHandler EventHandlerInterface) error
	Dispatch(event EventInterface)
	Remove(eventName string, eventHandler EventHandlerInterface) error
	Has(eventName string, eventHandler EventHandlerInterface) bool
	Clear() error
}
