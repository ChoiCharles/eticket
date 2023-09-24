package service

import (
	"archive/zip"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/textproto"
	"path"

	"eticket.org/blockchain-ipfs-uploader/config"
)

type UploadZipService struct {
	cfg    *config.ApplicationConfig
	client *http.Client
}

func rpcBody(dirName string, zipReader *zip.Reader, buf io.Writer) (boundary string, err error) {
	multipart := multipart.NewWriter(buf)
	boundary = multipart.Boundary()

	if _, err = multipart.CreatePart(textproto.MIMEHeader{
		"Content-Disposition": {"form-data; name=\"file\"; filename=\"" + dirName + "\""},
		"Content-Type":        {"application/x-directory"},
	}); err != nil {
		return
	}

	for _, file := range zipReader.File {
		if fileInfo := file.FileInfo(); !fileInfo.IsDir() {
			content, err := file.Open()
			if err != nil {
				return boundary, err
			}

			filepath := path.Join(dirName, fileInfo.Name())

			body, err := multipart.CreatePart(textproto.MIMEHeader{
				"Abspath":             {filepath},
				"Content-Disposition": {"form-data; name=\"file\"; filename=\"" + filepath + "\""},
				"Content-Type":        {"application/octet-stream"},
			})
			if err != nil {
				return boundary, err
			}

			data, err := io.ReadAll(content)
			if err != nil {
				return boundary, err
			}

			if _, err := body.Write(data); err != nil {
				return boundary, err
			}
		}
	}

	if err = multipart.Close(); err != nil {
		return
	}

	return multipart.Boundary(), nil
}

func (s *UploadZipService) Upload(ctx context.Context, dirname string, zipReader *zip.Reader) ([]map[string]any, error) {
	buf := new(bytes.Buffer)

	bounday, err := rpcBody(dirname, zipReader, buf)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequestWithContext(ctx, "POST", s.cfg.KuboRpcUrl+"/api/v0/add", buf)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "multipart/form-data; boundary="+bounday)

	resp, err := s.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("UploadZipService.Upload() failed: %w", err)
	}

	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("UploadZipService.Upload() failed: %w", err)
	}

	uploadedFiles := []map[string]any{}
	for _, jsonBytes := range bytes.Split(respBody, []byte{'\n'}) {
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
