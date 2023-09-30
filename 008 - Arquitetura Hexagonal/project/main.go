package main

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
	"go-hexagonal/adapters/database"
	"go-hexagonal/application"
)

func main() {
	db, _ := sql.Open("sqlite3", "db.sqlite")
	productDbAdapter := database.NewProductDb(db)
	productService := application.NewProductService(productDbAdapter)

	product, _ := productService.Create("Product 1", 10)

	productService.Enable(product)
}

