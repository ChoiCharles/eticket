package service

import (
	"archive/zip"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"path"

	"eticket.org/blockchain-ipfs-uploader/common"
	"eticket.org/blockchain-ipfs-uploader/config"
)

type UploadZipService struct {
	cfg    *config.ApplicationConfig
	client *http.Client
}

func appendAll(dirMultipartBuilder common.DirMultipartBuilder, zipReader *zip.Reader) error {
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
	if err := appendAll(dirMultipartBuilder, zipReader); err != nil {
		return nil, err
	}
	if err := dirMultipartBuilder.Close(); err != nil {
		return nil, err
	}

	req, err := http.NewRequestWithContext(ctx, "POST", s.cfg.KuboRpcUrl+"/api/v0/add", buf)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "multipart/form-data; boundary="+dirMultipartBuilder.Boundary())

	resp, err := s.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("UploadZipService.Upload() failed: %w", err)
	}

	defer resp.Body.Close()
	payload, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("UploadZipService.Upload() failed: %w", err)
	}

	uploadedFiles := []map[string]any{}
	for _, jsonBytes := range bytes.Split(payload, []byte{'\n'}) {
		if 0 < len(jsonBytes) {
			uploadResult := map[string]any{}
			json.Unmarshal(jsonBytes, &uploadResult)
			uploadedFiles = append(uploadedFiles, uploadResult)
		}
	}

	return uploadedFiles, nil
}

func NewUploadZipService(cfg *config.ApplicationConfig, client *http.Client) *UploadZipService {
	return &UploadZipService{
		cfg:    cfg,
		client: client,
	}
}
