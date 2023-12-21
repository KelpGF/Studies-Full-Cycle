package createtransaction

import (
	"context"
	"testing"

	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
	"github.com.br/kelpgf/fc-ms-wallet/internal/event"
	"github.com.br/kelpgf/fc-ms-wallet/internal/usecase/mocks"
	"github.com.br/kelpgf/fc-ms-wallet/pkg/events"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestNewCreateTransactionUseCaseExecute(t *testing.T) {
	mockClientFrom, _ := entity.NewClient("Client From", "c@f.com")
	mockAccountFrom := entity.NewAccount(mockClientFrom)
	mockAccountFrom.Credit(200)

	mockClientTo, _ := entity.NewClient("Client To", "c@t.com")
	mockAccountTo := entity.NewAccount(mockClientTo)
	mockAccountTo.Credit(50)

	mockUow := &mocks.UowMock{}
	mockUow.On("Do", mock.Anything, mock.Anything).Return(nil)

	dispatcher := events.NewEventDispatcher()
	eventTransaction := event.NewTransactionCreatedEvent()
	eventBalance := event.NewBalanceUpdated()

	input := &CreateTransactionInputDTO{
		AccountIdFrom: mockAccountFrom.ID,
		AccountIdTo:   mockAccountTo.ID,
		Amount:        100,
	}
	ctx := context.Background()

	uc := NewCreateTransactionUseCase(
		mockUow,
		dispatcher,
		eventTransaction,
		eventBalance,
	)
	output, err := uc.Execute(ctx, input)

	assert.Nil(t, err)
	assert.NotNil(t, output)
	mockUow.AssertExpectations(t)
	mockUow.AssertNumberOfCalls(t, "Do", 1)
}
