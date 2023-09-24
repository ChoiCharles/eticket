package config

import (
	"errors"
	"os"
)

type ApplicationConfig struct {
	KuboRpcUrl string
}

func New() (*ApplicationConfig, error) {
	kuboRpcUrl := os.Getenv("ETICKET_KUBO_RPC_URL")
	if len(kuboRpcUrl) == 0 {
		return nil, errors.New("missing enviroment variable: ETICKET_KUBO_RPC_URL")
	}

	cfg := &ApplicationConfig{
		KuboRpcUrl: kuboRpcUrl,
	}

	return cfg, nil
}
