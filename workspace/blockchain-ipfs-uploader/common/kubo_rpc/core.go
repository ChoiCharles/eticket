package kuborpc

import "net/http"

type KuboRpc struct {
	client           *http.Client
	kuboRpcServerUrl string
}

func (rpc KuboRpc) Apiv0() Apiv0 {
	return Apiv0{rpc}
}

func NewKuboRpc(client *http.Client, kuboRpcServerUrl string) KuboRpc {
	return KuboRpc{client, kuboRpcServerUrl}
}
