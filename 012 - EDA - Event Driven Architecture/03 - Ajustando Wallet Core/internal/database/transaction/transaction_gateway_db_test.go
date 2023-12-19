package database

import (
	"database/sql"
	"testing"

	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/suite"
)

type TransactionGatewayDBTestSuite struct {
	suite.Suite
	db                   *sql.DB
	transactionGatewayDB *TransactionGatewayDB
}

func (suite *TransactionGatewayDBTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	suite.Nil(err)

	db.Exec("CREATE TABLE transactions (id TEXT, account_id_from TEXT, account_id_to TEXT, amount REAL, created_at DATE)")
	suite.db = db

	suite.transactionGatewayDB = NewTransactionGatewayDB(db)
}

func (suite *TransactionGatewayDBTestSuite) TearDownSuite() {
	defer suite.db.Close()
	suite.db.Exec("DROP TABLE transactions")
}

func TestTransactionGatewatDBTestSuite(t *testing.T) {
	suite.Run(t, new(TransactionGatewayDBTestSuite))
}

func (suite *TransactionGatewayDBTestSuite) TestCreate() {
	clientFrom, _ := entity.NewClient("Jonh Doe", "j@d.com")
	accountFrom := entity.NewAccount(clientFrom)
	accountFrom.Credit(100.0)
	clientTo, _ := entity.NewClient("Jonh Doe 2", "j2@d.com")
	accountTo := entity.NewAccount(clientTo)

	transaction, err := entity.NewTransaction(accountFrom, accountTo, 10.0)
	suite.Nil(err)

	err = suite.transactionGatewayDB.Create(transaction)
	suite.Nil(err)
}
