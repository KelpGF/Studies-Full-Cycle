package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNewClient(t *testing.T) {
	client, err := NewClient("John Doe", "j@j.com")
	assert.Nil(t, err)
	assert.NotNil(t, client.ID)
	assert.Equal(t, "John Doe", client.Name)
	assert.Equal(t, "j@j.com", client.Email)
}

func TestNewClientWithInvalidArgs(t *testing.T) {
	client, err := NewClient("", "")

	assert.NotNil(t, err)
	assert.Nil(t, client)
}

func TestUpdateClient(t *testing.T) {
	client, _ := NewClient("John Doe", "j@j.com")
	err := client.Update("John Doe Update", "j2@j.com")

	assert.Nil(t, err)
	assert.Equal(t, "John Doe Update", client.Name)
	assert.Equal(t, "j2@j.com", client.Email)
}

func TestUpdateClientWithInvalidArgs(t *testing.T) {
	client, _ := NewClient("John Doe", "j@j.com")
	err := client.Update("", "j2@j.com")

	assert.Error(t, err, "name is required")
}

func TestAddAccountToClient(t *testing.T) {
	client, _ := NewClient("John Doe", "j@j.com")
	account := NewAccount(client)

	err := client.AddAccount(account)

	assert.Nil(t, err)
	assert.Equal(t, 1, len(client.Accounts))
}
