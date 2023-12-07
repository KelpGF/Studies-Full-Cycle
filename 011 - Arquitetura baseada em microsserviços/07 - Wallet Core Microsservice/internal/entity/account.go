package entity

import (
	"time"

	"github.com/google/uuid"
)

type Account struct {
	ID        string
	Client    *Client
	Balance   float64
	CreatedAt time.Time
	UpdateAt  time.Time
}

func NewAccount(client *Client) *Account {
	if client == nil {
		return nil
	}

	account := &Account{
		ID:        uuid.New().String(),
		Client:    client,
		Balance:   0,
		CreatedAt: time.Now(),
		UpdateAt:  time.Now(),
	}

	return account
}

func (a *Account) Credit(amount float64) {
	a.Balance += amount
	a.UpdateAt = time.Now()
}

func (a *Account) Debit(amount float64) {
	a.Balance -= amount
	a.UpdateAt = time.Now()
}
