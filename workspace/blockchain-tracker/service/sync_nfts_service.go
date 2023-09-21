package service

import (
	"context"
	"database/sql"

	"eticket.org/eticket-tracker/blockchain"
	persistence "eticket.org/eticket-tracker/persistence/generated"
)

type SyncNftsService struct {
	db      *sql.DB
	queries *persistence.Queries
}

type SyncNftsCommand struct {
	LowerBlock        int64
	UpperBlock        int64
	NftTransferEvents map[[32]byte]*blockchain.NftTransferEvent
}

func (s *SyncNftsService) SyncNfts(ctx context.Context, cmd SyncNftsCommand) error {
	tx, err := s.db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelReadCommitted})
	if err != nil {
		return err
	}

	queries := s.queries.WithTx(tx)
	defer tx.Rollback()

	for _, event := range cmd.NftTransferEvents {
		isNewToken := true
		for i := 0; i < len(event.From); i++ {
			if event.From[i] != 0 {
				isNewToken = false
				break
			}
		}

		if !isNewToken {
			if err := queries.UpdateNftTicket(ctx, persistence.UpdateNftTicketParams{
				TokenID: event.TokenId[:],
				Owner:   event.To[:],
			}); err != nil {
				return err
			}
		} else {
			if err = queries.CreateNftTicket(ctx, persistence.CreateNftTicketParams{
				TokenID: event.TokenId[:],
				Owner:   event.To[:],
			}); err != nil {
				return err
			}
		}
	}

	if err = queries.CreateSyncLog(ctx, persistence.CreateSyncLogParams{
		LowerBlock: cmd.LowerBlock,
		UpperBlock: cmd.UpperBlock,
	}); err != nil {
		return err
	}

	return tx.Commit()
}

func NewSyncNftsService(db *sql.DB, queries *persistence.Queries) *SyncNftsService {
	return &SyncNftsService{
		db:      db,
		queries: queries,
	}
}
