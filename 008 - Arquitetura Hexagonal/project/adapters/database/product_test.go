package database_test

import (
	"testing"
	"github.com/stretchr/testify/require"
	"log"
	"database/sql"
	"go-hexagonal/adapters/database"
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
