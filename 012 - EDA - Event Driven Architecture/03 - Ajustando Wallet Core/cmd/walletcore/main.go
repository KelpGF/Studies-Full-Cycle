package main

import (
	"database/sql"
	"fmt"

	"github.com.br/kelpgf/fc-ms-wallet/internal/database"
	"github.com.br/kelpgf/fc-ms-wallet/internal/event"
	createaccount "github.com.br/kelpgf/fc-ms-wallet/internal/usecase/create_account"
	createclient "github.com.br/kelpgf/fc-ms-wallet/internal/usecase/create_client"
	createtransaction "github.com.br/kelpgf/fc-ms-wallet/internal/usecase/create_transaction"
	"github.com.br/kelpgf/fc-ms-wallet/internal/web"
	"github.com.br/kelpgf/fc-ms-wallet/internal/web/webserver"
	"github.com.br/kelpgf/fc-ms-wallet/pkg/events"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", "root", "root", "wallet-mysql", "3306", "wallet"))
	if err != nil {
		panic(err)
	}

	defer db.Close()

	transactionCreatedEvent := event.NewTransactionCreatedEvent()
	eventDispatcher := events.NewEventDispatcher()
	// eventDisitpacher.Register("TransactionCreated", handler)

	clientRepository := database.NewClientGatewatDb(db)
	accountRepository := database.NewAccountGatewayDB(db)
	transactionRepository := database.NewTransactionGatewayDB(db)

	createClientUseCase := createclient.NewCreateClientUseCase(clientRepository)
	createAccountUseCase := createaccount.NewCreateAccountUseCase(accountRepository, clientRepository)
	createTransactionUseCase := createtransaction.NewCreateTransactionUseCase(
		transactionRepository,
		accountRepository,
		eventDispatcher,
		transactionCreatedEvent,
	)

	clientHandler := web.NewWebClientHandler(createClientUseCase)
	accountHandler := web.NewWebAccountHandler(createAccountUseCase)
	transactionHandler := web.NewWebTransactionHandler(createTransactionUseCase)

	webServer := webserver.NewWebServer(":3000")
	webServer.AddHandler("/client", clientHandler.CreateClient)
	webServer.AddHandler("/account", accountHandler.CreateAccount)
	webServer.AddHandler("/transaction", transactionHandler.CreateTransaction)

	webServer.Start()
}
