package main

import (
	"context"
	"database/sql"
	"fmt"

	"github.com.br/kelpgf/fc-ms-wallet/internal/database"
	"github.com.br/kelpgf/fc-ms-wallet/internal/event"
	"github.com.br/kelpgf/fc-ms-wallet/internal/event/handler"
	createaccount "github.com.br/kelpgf/fc-ms-wallet/internal/usecase/create_account"
	createclient "github.com.br/kelpgf/fc-ms-wallet/internal/usecase/create_client"
	createtransaction "github.com.br/kelpgf/fc-ms-wallet/internal/usecase/create_transaction"
	"github.com.br/kelpgf/fc-ms-wallet/internal/web"
	"github.com.br/kelpgf/fc-ms-wallet/internal/web/webserver"
	"github.com.br/kelpgf/fc-ms-wallet/pkg/events"
	"github.com.br/kelpgf/fc-ms-wallet/pkg/kafka"
	"github.com.br/kelpgf/fc-ms-wallet/pkg/uow"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", "root", "root", "wallet-mysql", "3306", "wallet"))
	if err != nil {
		panic(err)
	}

	defer db.Close()

	configMap := ckafka.ConfigMap{
		"bootstrap.servers": "kafka:29092",
		"group.id":          "wallet",
	}
	kafkaProducer := kafka.NewKafkaProducer(&configMap)

	transactionCreatedEvent := event.NewTransactionCreatedEvent()
	balanceUpdatedEvent := event.NewBalanceUpdated()
	eventDispatcher := events.NewEventDispatcher()
	eventDispatcher.Register("TransactionCreated", handler.NewTransactionCreatedKafkaHandler(kafkaProducer))
	eventDispatcher.Register("BalanceUpdated", handler.NewBalanceUpdatedKafkaHandler(kafkaProducer))

	clientRepository := database.NewClientGatewatDb(db)
	accountRepository := database.NewAccountGatewayDB(db)

	ctx := context.Background()
	uow := uow.NewUow(ctx, db)
	uow.Register("AccountDB", func(tx *sql.Tx) interface{} {
		return database.NewAccountGatewayDB(db)
	})
	uow.Register("TransactionDB", func(tx *sql.Tx) interface{} {
		return database.NewTransactionGatewayDB(db)
	})

	createClientUseCase := createclient.NewCreateClientUseCase(clientRepository)
	createAccountUseCase := createaccount.NewCreateAccountUseCase(accountRepository, clientRepository)
	createTransactionUseCase := createtransaction.NewCreateTransactionUseCase(
		uow,
		eventDispatcher,
		transactionCreatedEvent,
		balanceUpdatedEvent,
	)

	clientHandler := web.NewWebClientHandler(createClientUseCase)
	accountHandler := web.NewWebAccountHandler(createAccountUseCase)
	transactionHandler := web.NewWebTransactionHandler(createTransactionUseCase)

	webServer := webserver.NewWebServer(":3000")
	webServer.AddHandler("/client", clientHandler.CreateClient)
	webServer.AddHandler("/account", accountHandler.CreateAccount)
	webServer.AddHandler("/transaction", transactionHandler.CreateTransaction)

	fmt.Println("Server running on port 3000")
	webServer.Start()
}
