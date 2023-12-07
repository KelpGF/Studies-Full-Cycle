package createclient

import (
	"testing"

	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type ClientGatewayMock struct {
	mock.Mock
}

func (m *ClientGatewayMock) GetById(id string) (*entity.Client, error) {
	args := m.Called(id)
	return args.Get(0).(*entity.Client), args.Error(1)
}

func (m *ClientGatewayMock) Save(client *entity.Client) error {
	args := m.Called(client)
	return args.Error(0)
}

func TestCreateClientUseCaseExecute(t *testing.T) {
	m := &ClientGatewayMock{}
	m.On("Save", mock.Anything).Return(nil)
	input := &CreateClientInputDTO{
		Name:  "John Doe",
		Email: "j@j.com",
	}
	uc := NewCreateClientUseCase(m)

	output, err := uc.Execute(input)

	assert.Nil(t, err)
	assert.NotNil(t, output)
	assert.NotEmpty(t, output.ID)
	assert.Equal(t, input.Name, output.Name)
	m.AssertExpectations(t)
	m.AssertNumberOfCalls(t, "Save", 1)
}
