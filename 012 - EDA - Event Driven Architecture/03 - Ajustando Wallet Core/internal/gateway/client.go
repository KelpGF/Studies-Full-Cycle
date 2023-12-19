package gateway

import "github.com.br/kelpgf/fc-ms-wallet/internal/entity"

type ClientGateway interface {
	GetById(id string) (*entity.Client, error)
	Save(client *entity.Client) error
}
