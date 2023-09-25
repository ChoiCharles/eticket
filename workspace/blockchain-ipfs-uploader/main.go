package main

import (
	"eticket.org/blockchain-ipfs-uploader/config"
	"eticket.org/blockchain-ipfs-uploader/service"
	"eticket.org/blockchain-ipfs-uploader/web"
	"go.uber.org/fx"
)

func main() {
	fx.New(
		fx.Provide(config.New),
		web.NewFxModule(),
		service.NewFxModule(),
	).Run()
}
