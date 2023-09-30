package web

import (
	"context"
	"log"
	"net/http"

	"eticket.org/blockchain-ipfs-uploader/web/controller"
	"github.com/gin-gonic/gin"
	"go.uber.org/fx"
)

func NewGinEngine() *gin.Engine {
	ginEngine := gin.Default()
	ginEngine.MaxMultipartMemory = 64 << 20 // 64MiB
	return ginEngine
}

func invoke(register interface{}) fx.Option {
	return fx.Invoke(register)
}

func NewFxModule() fx.Option {
	return fx.Module(
		"web.fx",

		fx.Provide(
			NewClient,
			NewGinEngine,

			fx.Annotate(
				func(e *gin.Engine) *http.Server {
					return &http.Server{
						Addr:    ":39880",
						Handler: e,
					}
				},

				fx.OnStart(func(ctx context.Context, serv *http.Server) {
					go func() {
						if err := serv.ListenAndServe(); err != nil {
							log.Fatal(err)
						}
					}()
				}),

				fx.OnStop(func(ctx context.Context, serv *http.Server) error {
					return serv.Close()
				}),
			),
		),

		invoke(func(serv *http.Server) {}),
		invoke(controller.RegisterZipUploadController),
		invoke(controller.RegisterJsonUploadController),
	)
}
