package database

import (
	"database/sql"
	"testing"

	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/suite"
)

type AccountGatewayDBTestSuite struct {
	suite.Suite
	db               *sql.DB
	accountGatewatDB *AccountGatewayDB
	client           *entity.Client
}

func (suite *AccountGatewayDBTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	suite.Nil(err)

	db.Exec("CREATE TABLE clients (id TEXT, name TEXT, email TEXT, created_at DATE)")
	db.Exec("CREATE TABLE accounts (id TEXT, client_id TEXT, balance REAL, created_at DATE)")
	suite.db = db

	suite.accountGatewatDB = NewAccountGatewayDB(db)
	suite.client, _ = entity.NewClient("Jonh Doe", "j@d.com")
}

func (suite *AccountGatewayDBTestSuite) TearDownSuite() {
	defer suite.db.Close()
	suite.db.Exec("DROP TABLE accounts")
	suite.db.Exec("DROP TABLE clients")
}

func TestAccountGatewatDBTestSuite(t *testing.T) {
	suite.Run(t, new(AccountGatewayDBTestSuite))
}

func (suite *AccountGatewayDBTestSuite) TestSave() {
	account := entity.NewAccount(suite.client)

	err := suite.accountGatewatDB.Save(account)

	suite.Nil(err)
}

func (suite *AccountGatewayDBTestSuite) TestGetById() {
	suite.db.Exec("INSERT INTO clients(id, name, email, created_at) VALUES(?, ?, ?, ?)",
		suite.client.ID, suite.client.Name, suite.client.Email, suite.client.CreatedAt)

	account := entity.NewAccount(suite.client)
	err := suite.accountGatewatDB.Save(account)
	suite.Nil(err)

	accountSaved, err := suite.accountGatewatDB.GetById(account.ID)

	suite.Nil(err)
	suite.Equal(account.ID, accountSaved.ID)
	suite.Equal(account.Client.ID, accountSaved.Client.ID)
	suite.Equal(account.Balance, accountSaved.Balance)
}
