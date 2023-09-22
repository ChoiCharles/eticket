package blockchain

import "github.com/ethereum/go-ethereum/common"

type NftTransferEvent struct {
	From    common.Address
	To      common.Address
	TokenId [32]byte
}

func TopicsToNftTransferEvent(topics []common.Hash) *NftTransferEvent {
	return &NftTransferEvent{
		From:    common.BytesToAddress(topics[1][12:]),
		To:      common.BytesToAddress(topics[2][12:]),
		TokenId: topics[3],
	}
}
