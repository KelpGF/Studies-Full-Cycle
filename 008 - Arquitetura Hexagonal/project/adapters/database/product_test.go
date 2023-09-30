package database_test

import (
	"testing"
	"github.com/stretchr/testify/require"
	"log"
	"database/sql"
	"go-hexagonal/adapters/database"
	"go-hexagonal/application"
)

var Db *sql.DB

func setUp() {
	Db, _ = sql.Open("sqlite3", ":memory:")
	createTable(Db)
	createProduct(Db)
}

func createTable(db *sql.DB) {
	table := `
		CREATE TABLE products (
			id string,
			name string,
			price float64,
			status string
		);
	`

	stmt, err := db.Prepare(table)
	if err != nil {
		log.Fatal(err.Error())
	}

	stmt.Exec()
}

func createProduct(db *sql.DB) {
	insert := `
		INSERT INTO products VALUES (
			"abc",
			"Product Test",
			0,
			"disabled"
		);
	`

	stmt, err := db.Prepare(insert)
	if err != nil {
		log.Fatal(err.Error())
	}

	stmt.Exec()
}

func TestProductDb_Get(t *testing.T) {
	setUp()
	defer Db.Close()
	productDb := database.NewProductDb(Db)

	product, err := productDb.Get("abc")

	require.Nil(t, err)
	require.Equal(t, product.GetID(), "abc")
	require.Equal(t, product.GetName(), "Product Test")
	require.Equal(t, product.GetPrice(), 0.0)
	require.Equal(t, product.GetStatus(), "disabled")
}

func TestProductDb_Save(t *testing.T) {
	setUp()
	defer Db.Close()
	productDb := database.NewProductDb(Db)

	product := application.NewProduct()
	product.Name = "Product Test"
	product.Price = 25

	result, err := productDb.Save(product)
	require.Nil(t, err)
	require.Equal(t, result.GetName(), product.GetName())
	require.Equal(t, result.GetPrice(), product.GetPrice())
	require.Equal(t, result.GetStatus(), product.GetStatus())

	product.Status = "enabled"

	result, err = productDb.Save(product)

	require.Nil(t, err)
	require.Equal(t, result.GetName(), product.GetName())
	require.Equal(t, result.GetPrice(), product.GetPrice())
	require.Equal(t, result.GetStatus(), product.GetStatus())
}
