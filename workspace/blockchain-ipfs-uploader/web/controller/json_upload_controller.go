package controller

import (
	"context"
	"log"
	"net/http"

	"eticket.org/blockchain-ipfs-uploader/service"
	"github.com/gin-gonic/gin"
)

type uploadJsonRequest struct {
	Dirname string                    `json:"dirname" binding:"required"`
	Jsons   map[string]map[string]any `json:"jsons" binding:"required"`
}

func RegisterJsonUploadController(e *gin.Engine, uploadJsonService *service.UploadJsonService) {
	e.POST("/api/v0/upload/json", func(ctx *gin.Context) {
		var payload uploadJsonRequest
		if err := ctx.ShouldBindJSON(&payload); err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, map[string]any{
				"message": "Bad request body",
			})
			return
		}

		uploadInfos, err := uploadJsonService.Upload(context.Background(), payload.Dirname, payload.Jsons)
		if err != nil {
			log.Fatalln(err)
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, map[string]any{
				"message": "Server encoutered a problem while processing request. Pleases try again later.",
			})
			return
		}

		var dirinfo map[string]any
		files := make([]map[string]any, 0, len(uploadInfos)-1)

		for _, upload := range uploadInfos {
			if upload["Name"].(string) == payload.Dirname {
				dirinfo = upload
			} else {
				upload["Name"] = upload["Name"].(string)[len(uploadInfos)+1:]
				files = append(files, upload)
			}
		}

		dirinfo["items"] = files
		ctx.JSON(http.StatusCreated, map[string]any{"directory": dirinfo})
	})
}
