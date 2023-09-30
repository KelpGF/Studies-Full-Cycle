package Handler

import (
	"encoding/json"
)

func jsonError(msg string) []byte {
	errorMessage := struct {
		Message string `json:"message"`
	}{
		Message: msg,
	}

	r, err := json.Marshal(errorMessage)

	if err != nil {
		return []byte(err.Error())
	}

	return r
}
