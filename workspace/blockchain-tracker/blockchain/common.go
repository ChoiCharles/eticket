package blockchain

import (
	"context"
	"fmt"
	"math/big"
	"strings"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

func ContractBirthBlock(ctx context.Context, conn *ethclient.Client, contractAddress common.Address) (int64, error) {
	mostRecentBlock, err := conn.BlockNumber(ctx)
	if err != nil {
		return -1, fmt.Errorf("ContractBirthBlock() failure: %w", err)
	}

	lb, ub := int64(0), int64(mostRecentBlock)
	found := false

	for lb < ub {
		mid := (lb + ub) / 2

		if code, err := conn.CodeAt(ctx, contractAddress, big.NewInt(mid)); err != nil {
			if !strings.Contains(err.Error(), "missing trie node") {
				return -1, err
			}

			lb = mid + 1 // ignore error
			continue
		} else {
			if len(code) < 2 {
				lb = mid + 1
				found = true
			} else {
				ub = mid
			}
		}
	}

	if found {
		return ub, nil
	} else {
		return -1, nil
	}
}
