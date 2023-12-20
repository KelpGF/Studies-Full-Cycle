package mocks

import (
	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
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

func (m *AccountGatewayMock) UpdateBalance(account *entity.Account) error {
	args := m.Called(account)
	return args.Error(0)
}
