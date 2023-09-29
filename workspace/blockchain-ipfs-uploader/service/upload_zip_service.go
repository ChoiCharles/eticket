package service

import (
	"archive/zip"
	"bytes"
	"context"
	"io"
	"net/http"
	"path"

	"eticket.org/blockchain-ipfs-uploader/common"
	kuborpc "eticket.org/blockchain-ipfs-uploader/common/kubo_rpc"
	"eticket.org/blockchain-ipfs-uploader/config"
)

type UploadZipService struct {
	cfg    *config.ApplicationConfig
	client *http.Client
}

func (s *UploadZipService) appendAll(dirMultipartBuilder common.DirMultipartBuilder, zipReader *zip.Reader) error {
	for _, file := range zipReader.File {
		if fileInfo := file.FileInfo(); !fileInfo.IsDir() {
			filecontentReader, err := file.Open()
			if err != nil {
				return err
			}

			defer filecontentReader.Close()
			filecontent, err := io.ReadAll(filecontentReader)
			if err != nil {
				return err
			}

			filepath := path.Join(dirMultipartBuilder.DirectoryName(), fileInfo.Name())
			if err := dirMultipartBuilder.AppendFile(filepath, filecontent); err != nil {
				return err
			}
		}
	}

	return nil
}

func (s *UploadZipService) Upload(ctx context.Context, dirname string, zipReader *zip.Reader) ([]map[string]any, error) {
	buf := new(bytes.Buffer)

	dirMultipartBuilder := common.NewDirMultipartBuilder(buf)
	if err := dirMultipartBuilder.Directory(dirname); err != nil {
		return nil, err
	}
	if err := s.appendAll(dirMultipartBuilder, zipReader); err != nil {
		return nil, err
	}
	if err := dirMultipartBuilder.Close(); err != nil {
		return nil, err
	}

	apiv0 := kuborpc.NewKuboRpc(s.client, s.cfg.KuboRpcUrl).Apiv0()
	return apiv0.AddDirectory(ctx, dirMultipartBuilder.Boundary(), buf)
}

func NewUploadZipService(cfg *config.ApplicationConfig, client *http.Client) *UploadZipService {
	return &UploadZipService{
		cfg:    cfg,
		client: client,
	}
}
