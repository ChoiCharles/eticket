package service

import "go.uber.org/fx"

func NewFxModule() fx.Option {
	return fx.Module(
		"service.fx",

		fx.Provide(
			NewUploadZipService,
			NewUploadJsonService,
		),
	)
}
