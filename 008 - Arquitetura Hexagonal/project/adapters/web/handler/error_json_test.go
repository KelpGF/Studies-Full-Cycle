package Handler

import (
	"testing"
	"github.com/stretchr/testify/require"
)

func TestJsonError(t *testing.T) {
	msg := "test json"
	result := jsonError(msg)
	require.Equal(t, `{"message":"test json"}`, string(result))
}
