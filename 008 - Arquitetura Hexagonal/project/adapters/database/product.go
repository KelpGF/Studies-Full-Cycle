package database

import (
	"database/sql"
	"go-hexagonal/application"
	_ "github.com/mattn/go-sqlite3"
)

type ProductDb struct {
	db *sql.DB
}

func (p *productDb) Get(id string) (application.ProductInterface, err) {
	var product application.Product

	stmt, err := p.db.Prepare("select id, name, price, status from products where id = ?")
	if err != nil {
		return nil, err
	}

	err = stmt.QueryRow(id).Scan(&product.ID, &product.Name, &product.Price, &product.Status)
	if  err != nil {
		return nil, err
	}

	return &product, nil
}
