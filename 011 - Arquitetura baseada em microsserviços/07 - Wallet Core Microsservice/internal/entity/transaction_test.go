package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateTransaction(t *testing.T) {
	client1, _ := NewClient("John Doe", "j@j")
	account1 := NewAccount(client1)
	account1.Credit(100)

	client2, _ := NewClient("John Doe 2", "j2@j")
	account2 := NewAccount(client2)
	account2.Credit(100)

	transaction, err := NewTransaction(account1, account2, 50)

	assert.Nil(t, err)
	assert.Equal(t, 50.0, account1.Balance)
	assert.Equal(t, 150.0, account2.Balance)
	assert.Equal(t, account1.ID, transaction.AccountFrom.ID)
	assert.Equal(t, account2.ID, transaction.AccountTo.ID)
}

func TestCreateTransactionWithInsuficientBalance(t *testing.T) {
	client1, _ := NewClient("John Doe", "j@j")
	account1 := NewAccount(client1)
	account1.Credit(100)

	client2, _ := NewClient("John Doe 2", "j2@j")
	account2 := NewAccount(client2)
	account2.Credit(100)

	transaction, err := NewTransaction(account1, account2, 200)

	assert.Error(t, err, "insuficient balance")
	assert.Nil(t, transaction)
	assert.Equal(t, 100.0, account1.Balance)
	assert.Equal(t, 100.0, account2.Balance)
}
