package createaccount

import (
	"testing"

	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type ClientGatewayMock struct {
	mock.Mock
}

func (c *ClientGatewayMock) GetById(id string) (*entity.Client, error) {
	args := c.Called(id)
	return args.Get(0).(*entity.Client), args.Error(1)
}

func (m *ClientGatewayMock) Save(client *entity.Client) error {
	args := m.Called(client)
	return args.Error(0)
}

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

func TestNewCreateAccountUseCaseExecute(t *testing.T) {
	clientMock, _ := entity.NewClient(
		"Jonh Doe",
		"j@j.com",
	)
	clientGatewayMock := &ClientGatewayMock{}
	clientGatewayMock.On("GetById", clientMock.ID).Return(clientMock, nil)

	accountGatewayMock := &AccountGatewayMock{}
	accountGatewayMock.On("Save", mock.Anything).Return(nil)

	input := &CreateAccountInputDTO{
		ClientID: clientMock.ID,
	}
	uc := NewCreateAccountUseCase(accountGatewayMock, clientGatewayMock)

	output, err := uc.Execute(input)

	assert.Nil(t, err)
	assert.NotNil(t, output)
	assert.NotNil(t, output.ID)

	clientGatewayMock.AssertExpectations(t)
	clientGatewayMock.AssertCalled(t, "GetById", clientMock.ID)
	clientGatewayMock.AssertNumberOfCalls(t, "GetById", 1)

	accountGatewayMock.AssertExpectations(t)
	accountGatewayMock.AssertNumberOfCalls(t, "Save", 1)
}
