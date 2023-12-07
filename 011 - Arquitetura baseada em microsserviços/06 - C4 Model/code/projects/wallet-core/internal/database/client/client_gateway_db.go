package database

import (
	"database/sql"

	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
)

type ClientGatewatDB struct {
	DB *sql.DB
}

func NewClientGatewatDb(db *sql.DB) *ClientGatewatDB {
	return &ClientGatewatDB{DB: db}
}

func (c *ClientGatewatDB) GetById(id string) (*entity.Client, error) {
	client := &entity.Client{}
	stmt, err := c.DB.Prepare("SELECT id, name, email, created_at FROM clients WHERE id = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	row := stmt.QueryRow(id)
	err = row.Scan(&client.ID, &client.Name, &client.Email, &client.CreatedAt)
	if err != nil {
		return nil, err
	}

	return client, nil
}

func (c *ClientGatewatDB) Save(client *entity.Client) error {
	stmt, err := c.DB.Prepare("INSERT INTO clients(id, name, email, created_at) VALUES(?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(client.ID, client.Name, client.Email, client.CreatedAt)
	if err != nil {
		return err
	}

	return nil
}
