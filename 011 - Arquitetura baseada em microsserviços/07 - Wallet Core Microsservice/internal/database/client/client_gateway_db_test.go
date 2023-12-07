package database

import (
	"database/sql"
	"testing"

	"github.com.br/kelpgf/fc-ms-wallet/internal/entity"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/suite"
)

type ClientGatewatDBTestSuite struct {
	suite.Suite
	db              *sql.DB
	clientGatewatDB *ClientGatewatDB
}

func (s *ClientGatewatDBTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	s.Nil(err)
	s.db = db
	db.Exec("CREATE TABLE clients (id TEXT, name TEXT, email TEXT, created_at DATE)")
	s.clientGatewatDB = NewClientGatewatDb(db)
}

func (s *ClientGatewatDBTestSuite) TearDownSuite() {
	defer s.db.Close()
	s.db.Exec("DROP TABLE clients")
}

func TestClientGatewatDBTestSuite(t *testing.T) {
	suite.Run(t, new(ClientGatewatDBTestSuite))
}

func (s *ClientGatewatDBTestSuite) TestGetById() {
	client, _ := entity.NewClient("Jonh Doe", "j@d.com")
	s.clientGatewatDB.Save(client)

	clientSaved, err := s.clientGatewatDB.GetById(client.ID)

	s.Nil(err)
	s.Equal(client.ID, clientSaved.ID)
	s.Equal(client.Name, clientSaved.Name)
	s.Equal(client.Email, clientSaved.Email)
}

func (s *ClientGatewatDBTestSuite) TestSave() {
	client, _ := entity.NewClient("Jonh Doe", "j@d.com")

	err := s.clientGatewatDB.Save(client)

	s.Nil(err)
}
