package gateway

import "github.com.br/kelpgf/fc-ms-wallet/internal/entity"

type AccountGateway interface {
	GetById(id string) (*entity.Account, error)
	Save(account *entity.Account) error
}
