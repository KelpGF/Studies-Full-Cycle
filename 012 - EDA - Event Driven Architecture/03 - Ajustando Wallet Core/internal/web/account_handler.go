package web

import (
	"encoding/json"
	"net/http"

	createaccount "github.com.br/kelpgf/fc-ms-wallet/internal/usecase/create_account"
)

type WebAccountHandler struct {
	CreateAccountUseCase *createaccount.CreateAccountUseCase
}

func NewWebAccountHandler(createAccountUseCase *createaccount.CreateAccountUseCase) *WebAccountHandler {
	return &WebAccountHandler{
		CreateAccountUseCase: createAccountUseCase,
	}
}

func (h *WebAccountHandler) CreateAccount(w http.ResponseWriter, r *http.Request) {
	var dto createaccount.CreateAccountInputDTO
	err := json.NewDecoder(r.Body).Decode(&dto)

	if err != nil {
		println(err.Error())
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	output, err := h.CreateAccountUseCase.Execute(&dto)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	err = json.NewEncoder(w).Encode(output)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
