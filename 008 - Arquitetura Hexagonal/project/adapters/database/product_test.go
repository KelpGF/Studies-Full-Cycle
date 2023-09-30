package database

import (
	"log"
	"database/sql"
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

	stmt.Exec(table)
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

	stmt.Exec(insert)
}
