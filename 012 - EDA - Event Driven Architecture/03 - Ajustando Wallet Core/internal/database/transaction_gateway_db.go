package database

import (
	"database/sql"

	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
)

type TransactionGatewayDB struct {
	DB *sql.DB
}

func NewTransactionGatewayDB(db *sql.DB) *TransactionGatewayDB {
	return &TransactionGatewayDB{DB: db}
}

func (transactionGatewayDB *TransactionGatewayDB) Create(transaction *entity.Transaction) error {
	stmt, err := transactionGatewayDB.DB.Prepare("INSERT INTO transactions(id, account_id_from, account_id_to, amount, created_at) VALUES(?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}

	_, err = stmt.Exec(
		transaction.ID,
		transaction.AccountFrom.ID,
		transaction.AccountTo.ID,
		transaction.Amount,
		transaction.CreatedAt,
	)
	if err != nil {
		return err
	}

	return nil
}
