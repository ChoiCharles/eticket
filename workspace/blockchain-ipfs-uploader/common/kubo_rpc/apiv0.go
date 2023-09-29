package kuborpc

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type Apiv0 struct {
	KuboRpc
}

func (rpc Apiv0) AddDirectory(ctx context.Context, boundary string, payload io.Reader) ([]map[string]any, error) {
	req, err := http.NewRequestWithContext(ctx, "POST", rpc.kuboRpcServerUrl+"/api/v0/add", payload)
	if err == nil {
		req.Header.Set("Content-Type", "multipart/form-data; boundary="+boundary)
	} else {
		return nil, fmt.Errorf("KuboRpc.api.v0.add() failed: %w", err)
	}

	defer req.Body.Close()
	resp, err := rpc.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("KuboRpc.api.v0.add() failed: %w", err)
	}

	defer resp.Body.Close()
	respPayload, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("KuboRpc.api.v0.add() failed: %w", err)
	}

	ret := []map[string]any{}
	for _, bytesLine := range bytes.Split(respPayload, []byte{'\n'}) {
		if 0 < len(bytesLine) {
			uploadInfo := map[string]any{}
			json.Unmarshal(bytesLine, &uploadInfo)
			ret = append(ret, uploadInfo)
		}
	}

	return ret, nil
}
