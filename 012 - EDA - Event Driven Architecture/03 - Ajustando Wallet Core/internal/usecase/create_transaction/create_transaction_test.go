package createtransaction

import (
	"testing"

	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
	"github.com.br/kelpgf/fc-ms-wallet/internal/event"
	"github.com.br/kelpgf/fc-ms-wallet/pkg/events"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type AccountGatewayMock struct {
	mock.Mock
}

func (a *AccountGatewayMock) GetById(id string) (*entity.Account, error) {
	args := a.Called(id)
	return args.Get(0).(*entity.Account), args.Error(1)
}
func (a *AccountGatewayMock) Save(account *entity.Account) error {
	args := a.Called(account)
	return args.Error(0)
}

type TransactionGatewayMock struct {
	mock.Mock
}

func (t *TransactionGatewayMock) Create(transaction *entity.Transaction) error {
	args := t.Called(transaction)
	return args.Error(0)
}

func TestNewCreateTransactionUseCaseExecute(t *testing.T) {
	mockAccountGatewayMock := &AccountGatewayMock{}

	mockClientFrom, _ := entity.NewClient("Client From", "c@f.com")
	mockAccountFrom := entity.NewAccount(mockClientFrom)
	mockAccountFrom.Credit(200)
	mockAccountGatewayMock.On("GetById", mockAccountFrom.ID).Return(mockAccountFrom, nil)

	mockClientTo, _ := entity.NewClient("Client To", "c@t.com")
	mockAccountTo := entity.NewAccount(mockClientTo)
	mockAccountTo.Credit(50)
	mockAccountGatewayMock.On("GetById", mockAccountTo.ID).Return(mockAccountTo, nil)

	mockTransactionGateway := &TransactionGatewayMock{}
	mockTransactionGateway.On("Create", mock.Anything).Return(nil)

	input := &CreateTransactionInputDTO{
		AccountIdFrom: mockAccountFrom.ID,
		AccountIdTo:   mockAccountTo.ID,
		Amount:        100,
	}

	dispatcher := events.NewEventDispatcher()
	event := event.NewTransactionCreatedEvent()

	uc := NewCreateTransactionUseCase(
		mockTransactionGateway,
		mockAccountGatewayMock,
		dispatcher,
		event,
	)

	output, err := uc.Execute(input)

	assert.Nil(t, err)
	assert.NotNil(t, output)
	assert.NotNil(t, output.ID)

	mockTransactionGateway.AssertExpectations(t)
	mockTransactionGateway.AssertNumberOfCalls(t, "Create", 1)

	mockAccountGatewayMock.AssertExpectations(t)
	mockAccountGatewayMock.AssertNumberOfCalls(t, "GetById", 2)
	mockAccountGatewayMock.AssertCalled(t, "GetById", mockAccountFrom.ID)
	mockAccountGatewayMock.AssertCalled(t, "GetById", mockAccountTo.ID)
}
