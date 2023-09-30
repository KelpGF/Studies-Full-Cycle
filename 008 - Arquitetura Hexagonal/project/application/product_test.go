package application_test

import (
	"testing"
	"github.com/stretchr/testify/require"
	uuid "github.com/satori/go.uuid"
	"go-hexagonal/application"
)

func TestProduct_Enable(t *testing.T) {
	product := application.Product{}
	product.Name = "Product Test"
	product.Price = 10
	product.Status = application.DISABLED

	err := product.Enable()
	require.Nil(t, err)

	product.Price = 0
	err = product.Enable()
	require.Equal(t, "the price must be greater than zero to enable the product", err.Error())
}

func TestProduct_Disable(t *testing.T) {
	product := application.Product{}
	product.Name = "Product Test"
	product.Price = 0
	product.Status = application.ENABLED

	err := product.Disable()
	require.Nil(t, err)

	product.Price = 10
	err = product.Disable()
	require.Equal(t, "the price must be zero to disable the product", err.Error())
}

func TestProduct_IsValid(t *testing.T) {
	product := application.Product{}
	product.ID = uuid.NewV4().String()
	product.Name = "Product Test"
	product.Price = 10
	product.Status = application.DISABLED

	_, err := product.IsValid()
	require.Nil(t, err)

	product.Status = "invalid"
	_, err = product.IsValid()
	require.Equal(t, "the status must be enabled or disabled", err.Error())

	product.Status = application.ENABLED
	product.Price = -10
	_, err = product.IsValid()
	require.Equal(t, "the price must be greater or equal zero", err.Error())

	product.Price = 10
	product.Name = ""
	_, err = product.IsValid()
	require.Equal(t, "Name: non zero value required", err.Error())

	product.Name = "Product Test"
	product.ID = "123"
	_, err = product.IsValid()
	require.Equal(t, "ID: 123 does not validate as uuidv4", err.Error())
}

func TestProduct_GetID(t *testing.T) {
	product := application.Product{}
	product.ID = uuid.NewV4().String()

	id := product.GetID()

	require.Equal(t, product.ID, id)
}

func TestProduct_GetName(t *testing.T) {
	product := application.Product{}
	product.Name = "Product Test"

	name := product.GetName()

	require.Equal(t, product.Name, name)
}

func TestProduct_GetStatus(t *testing.T) {
	product := application.Product{}
	product.Status = application.ENABLED

	status := product.GetStatus()

	require.Equal(t, product.Status, status)
}

func TestProduct_GetPrice(t *testing.T) {
	product := application.Product{}
	product.Price = 10

	price := product.GetPrice()

	require.Equal(t, product.Price, price)
}
