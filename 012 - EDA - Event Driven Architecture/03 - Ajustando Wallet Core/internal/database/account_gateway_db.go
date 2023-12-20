package database

import (
	"database/sql"

	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
)

type AccountGatewayDB struct {
	DB *sql.DB
}

func NewAccountGatewayDB(db *sql.DB) *AccountGatewayDB {
	return &AccountGatewayDB{DB: db}
}

func (a *AccountGatewayDB) GetById(id string) (*entity.Account, error) {
	var account entity.Account
	var client entity.Client
	account.Client = &client

	stmt, err := a.DB.Prepare("SELECT a.id, a.balance, a.created_at, c.id, c.name, c.email, c.created_at FROM accounts a INNER JOIN clients c ON a.client_id = c.id WHERE a.id = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	row := stmt.QueryRow(id)
	err = row.Scan(&account.ID, &account.Balance, &account.CreatedAt, &client.ID, &client.Name, &client.Email, &client.CreatedAt)
	if err != nil {
		println(err.Error())
		return nil, err
	}

	return &account, nil
}

func (a *AccountGatewayDB) Save(account *entity.Account) error {
	stmt, err := a.DB.Prepare("INSERT INTO accounts(id, client_id, balance, created_at) VALUES(?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(account.ID, account.Client.ID, account.Balance, account.CreatedAt)
	if err != nil {
		return err
	}

	return nil
}

func (a *AccountGatewayDB) UpdateBalance(account *entity.Account) error {
	stmt, err := a.DB.Prepare("UPDATE accounts SET balance = ? WHERE id = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(account.Balance, account.ID)
	if err != nil {
		return err
	}

	return nil
}
