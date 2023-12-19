package createtransaction

import (
	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
	"github.com.br/kelpgf/fc-ms-wallet/internal/gateway"
	events "github.com.br/kelpgf/fc-ms-wallet/pkg/events"
)

type CreateTransactionInputDTO struct {
	AccountIdFrom string  `json:"account_id_from"`
	AccountIdTo   string  `json:"account_id_to"`
	Amount        float64 `json:"amount"`
}

type CreateTransactionOutputDTO struct {
	ID string
}

type CreateTransactionUseCase struct {
	TransactionGateway      gateway.TransactionGateway
	AccountGateway          gateway.AccountGateway
	EventDispatcher         events.EventDispatcherInterface
	TransactionCreatedEvent events.EventInterface
}

func NewCreateTransactionUseCase(
	transactionGateway gateway.TransactionGateway,
	accountGateway gateway.AccountGateway,
	eventDispatcher events.EventDispatcherInterface,
	transactionCreatedEvent events.EventInterface,
) *CreateTransactionUseCase {
	return &CreateTransactionUseCase{
		TransactionGateway:      transactionGateway,
		AccountGateway:          accountGateway,
		EventDispatcher:         eventDispatcher,
		TransactionCreatedEvent: transactionCreatedEvent,
	}
}

func (uc *CreateTransactionUseCase) Execute(input *CreateTransactionInputDTO) (*CreateTransactionOutputDTO, error) {
	accountFrom, err := uc.AccountGateway.GetById(input.AccountIdFrom)
	if err != nil {
		return nil, err
	}
	accountTo, err := uc.AccountGateway.GetById(input.AccountIdTo)
	if err != nil {
		return nil, err
	}

	transaction, err := entity.NewTransaction(accountFrom, accountTo, input.Amount)
	if err != nil {
		return nil, err
	}

	err = uc.TransactionGateway.Create(transaction)
	if err != nil {
		return nil, err
	}

	output := &CreateTransactionOutputDTO{
		ID: transaction.ID,
	}

	uc.TransactionCreatedEvent.SetPayload(output)
	uc.EventDispatcher.Dispatch(uc.TransactionCreatedEvent)

	return output, nil
}
