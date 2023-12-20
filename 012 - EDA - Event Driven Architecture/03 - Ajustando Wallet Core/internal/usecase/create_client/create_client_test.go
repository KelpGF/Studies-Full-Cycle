package createclient

import (
	"testing"

	"github.com.br/kelpgf/fc-ms-wallet/internal/usecase/mocks"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestCreateClientUseCaseExecute(t *testing.T) {
	m := &mocks.ClientGatewayMock{}
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
