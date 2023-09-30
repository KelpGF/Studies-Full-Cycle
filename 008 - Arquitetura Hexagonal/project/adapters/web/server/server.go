package server

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/codegangsta/negroni"

	"go-hexagonal/application"
	pHandler "go-hexagonal/adapters/web/handler"
)

type WebServer struct {
	Service application.ProductServiceInterface
}

func MakeNewWebServer() *WebServer {
	return &WebServer{}
}

func (w *WebServer) Serve() {
	r := mux.NewRouter()
	n := negroni.New(
		negroni.NewLogger(),
	)

	pHandler.MakeProductHandlers(r, n, w.Service)
	http.Handle("/", r)

	server := &http.Server{
		Addr:    ":9000",
		Handler: http.DefaultServeMux,
		ReadTimeout: 10 * time.Second,
		WriteTimeout: 10 * time.Second,
		ErrorLog: log.New(os.Stderr, "log: ", log.Lshortfile),
	}

	err := server.ListenAndServe()

	if err != nil {
		log.Fatal(err)
	}
}
