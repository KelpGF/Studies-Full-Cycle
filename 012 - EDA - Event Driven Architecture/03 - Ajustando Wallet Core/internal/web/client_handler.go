package web

import (
	"encoding/json"
	"net/http"

	createclient "github.com.br/kelpgf/fc-ms-wallet/internal/usecase/create_client"
)

type WebClientHandler struct {
	CreateClientUseCase *createclient.CreateClientUseCase
}

func NewWebClientHandler(createClientUseCase *createclient.CreateClientUseCase) *WebClientHandler {
	return &WebClientHandler{
		CreateClientUseCase: createClientUseCase,
	}
}

func (h *WebClientHandler) CreateClient(w http.ResponseWriter, r *http.Request) {
	var dto createclient.CreateClientInputDTO
	err := json.NewDecoder(r.Body).Decode(&dto)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	output, err := h.CreateClientUseCase.Execute(&dto)
	if err != nil {
		println(err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	err = json.NewEncoder(w).Encode(output)
	if err != nil {
		println(err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
