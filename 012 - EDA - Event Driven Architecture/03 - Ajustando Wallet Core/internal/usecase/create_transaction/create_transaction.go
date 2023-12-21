package createtransaction

import (
	"context"

	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
	"github.com.br/kelpgf/fc-ms-wallet/internal/gateway"
	events "github.com.br/kelpgf/fc-ms-wallet/pkg/events"
	"github.com.br/kelpgf/fc-ms-wallet/pkg/uow"
)

type CreateTransactionInputDTO struct {
	AccountIdFrom string  `json:"account_id_from"`
	AccountIdTo   string  `json:"account_id_to"`
	Amount        float64 `json:"amount"`
}

type CreateTransactionOutputDTO struct {
	ID            string
	AccountIdFrom string
	AccountIdTo   string
	Amount        float64
}

type BalanceUpdatedOutputDTO struct {
	AccountIdFrom        string  `json:"account_id_from"`
	AccountIdTo          string  `json:"account_id_to"`
	BalanceAccountIdFrom float64 `json:"balance_account_id_from"`
	BalanceAccountIdTo   float64 `json:"balance_account_id_to"`
}

type CreateTransactionUseCase struct {
	Uow                     uow.UowInterface
	EventDispatcher         events.EventDispatcherInterface
	TransactionCreatedEvent events.EventInterface
	BalanceUpdatedEvent     events.EventInterface
}

func NewCreateTransactionUseCase(
	Uow uow.UowInterface,
	eventDispatcher events.EventDispatcherInterface,
	transactionCreatedEvent events.EventInterface,
	balanceUpdatedEvent events.EventInterface,
) *CreateTransactionUseCase {
	return &CreateTransactionUseCase{
		Uow:                     Uow,
		EventDispatcher:         eventDispatcher,
		TransactionCreatedEvent: transactionCreatedEvent,
		BalanceUpdatedEvent:     balanceUpdatedEvent,
	}
}

func (uc *CreateTransactionUseCase) Execute(ctx context.Context, input *CreateTransactionInputDTO) (*CreateTransactionOutputDTO, error) {
	output := &CreateTransactionOutputDTO{}
	balanceUpdatedOutputDTO := &BalanceUpdatedOutputDTO{}

	err := uc.Uow.Do(ctx, func(_ *uow.Uow) error {
		accountGateway := uc.getAccountGateway(ctx)
		transactionGateway := uc.getTransactionGateway(ctx)

		accountFrom, err := accountGateway.GetById(input.AccountIdFrom)
		if err != nil {
			return err
		}

		accountTo, err := accountGateway.GetById(input.AccountIdTo)
		if err != nil {
			return err
		}

		transaction, err := entity.NewTransaction(accountFrom, accountTo, input.Amount)
		if err != nil {
			return err
		}

		err = accountGateway.UpdateBalance(accountFrom)
		if err != nil {
			return err
		}

		err = accountGateway.UpdateBalance(accountTo)
		if err != nil {
			return err
		}

		err = transactionGateway.Create(transaction)
		if err != nil {
			return err
		}

		output.ID = transaction.ID
		output.AccountIdFrom = transaction.AccountFrom.ID
		output.AccountIdTo = transaction.AccountTo.ID
		output.Amount = transaction.Amount

		balanceUpdatedOutputDTO.AccountIdFrom = accountFrom.ID
		balanceUpdatedOutputDTO.AccountIdTo = accountTo.ID
		balanceUpdatedOutputDTO.BalanceAccountIdFrom = accountFrom.Balance
		balanceUpdatedOutputDTO.BalanceAccountIdTo = accountTo.Balance

		return nil
	})
	if err != nil {
		return nil, err
	}

	uc.TransactionCreatedEvent.SetPayload(output)
	uc.EventDispatcher.Dispatch(uc.TransactionCreatedEvent)

	uc.BalanceUpdatedEvent.SetPayload(balanceUpdatedOutputDTO)
	uc.EventDispatcher.Dispatch(uc.BalanceUpdatedEvent)

	return output, nil
}

func (uc *CreateTransactionUseCase) getAccountGateway(ctx context.Context) gateway.AccountGateway {
	repo, err := uc.Uow.GetRepository(ctx, "AccountDB")
	if err != nil {
		panic(err)
	}

	return repo.(gateway.AccountGateway)
}

func (uc *CreateTransactionUseCase) getTransactionGateway(ctx context.Context) gateway.TransactionGateway {
	repo, err := uc.Uow.GetRepository(ctx, "TransactionDB")
	if err != nil {
		panic(err)
	}

	return repo.(gateway.TransactionGateway)
}
