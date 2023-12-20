package mocks

import (
	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
	"github.com/stretchr/testify/mock"
)

type TransactionGatewayMock struct {
	mock.Mock
}

func (t *TransactionGatewayMock) Create(transaction *entity.Transaction) error {
	args := t.Called(transaction)
	return args.Error(0)
}
