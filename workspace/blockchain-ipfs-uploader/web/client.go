package web

import "net/http"

type KuboRpcClient struct {
}

func NewClient() *http.Client {
	return &http.Client{}
}
