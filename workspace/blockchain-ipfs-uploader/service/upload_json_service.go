package service

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"path"
	"strings"

	"eticket.org/blockchain-ipfs-uploader/common"
	kuborpc "eticket.org/blockchain-ipfs-uploader/common/kubo_rpc"
	"eticket.org/blockchain-ipfs-uploader/config"
)

type UploadJsonService struct {
	cfg    *config.ApplicationConfig
	client *http.Client
}

func (s *UploadJsonService) appendAll(dirMultipartBuilder common.DirMultipartBuilder, jsons map[string]map[string]any) error {
	jsonbuf := make([]byte, 0, 1<<12)

	for jsonname, jsoncontent := range jsons {
		jsonbuf = jsonbuf[:0]

		if !strings.HasSuffix(jsonname, ".json") {
			continue
		}

		data, err := json.Marshal(jsoncontent)
		if err != nil {
			return err
		}

		dirMultipartBuilder.AppendFile(path.Join(dirMultipartBuilder.DirectoryName(), jsonname), data)
	}

	return nil
}

func (s *UploadJsonService) Upload(ctx context.Context, dirname string, jsons map[string]map[string]any) ([]map[string]any, error) {
	buf := new(bytes.Buffer)

	dirMultipartBuilder := common.NewDirMultipartBuilder(buf)
	if err := dirMultipartBuilder.Directory(dirname); err != nil {
		return nil, err
	}
	if err := s.appendAll(dirMultipartBuilder, jsons); err != nil {
		return nil, err
	}
	if err := dirMultipartBuilder.Close(); err != nil {
		return nil, err
	}

	apiv0 := kuborpc.NewKuboRpc(s.client, s.cfg.KuboRpcUrl).Apiv0()
	return apiv0.AddDirectory(ctx, dirMultipartBuilder.Boundary(), buf)
}

func NewUploadJsonService(cfg *config.ApplicationConfig, client *http.Client) *UploadJsonService {
	return &UploadJsonService{
		cfg:    cfg,
		client: client,
	}
}
