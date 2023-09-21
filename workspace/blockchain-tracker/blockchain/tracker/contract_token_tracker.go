package tracker

import (
	"bytes"
	"context"
	"database/sql"
	"errors"
	"fmt"
	"math/big"
	"sort"
	"strings"
	"time"

	"eticket.org/eticket-tracker/blockchain"
	"eticket.org/eticket-tracker/config"
	contract "eticket.org/eticket-tracker/contract/generated"
	persistence "eticket.org/eticket-tracker/persistence/generated"
	"eticket.org/eticket-tracker/service"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"go.uber.org/zap"

	_ "github.com/go-sql-driver/mysql"
)

type contractTokenTrackerWorkerContext struct {
	context.Context
	cancel func()
}

type ContractTokenTracker struct {
	log             *zap.Logger
	ethConn         *ethclient.Client
	syncNftsService *service.SyncNftsService

	contractAbi     abi.ABI
	contractAddress common.Address

	latestSyncedBlock int64
	syncBatchSize     int64
	workerCtx         *contractTokenTrackerWorkerContext
}

func (t *ContractTokenTracker) checkLatestSyncedBlock(ctx context.Context, queries *persistence.Queries) error {
	if 0 <= t.latestSyncedBlock {
		return nil
	}

	syncLog, err := queries.GetLatestSyncLog(ctx)
	if err != nil {
		if !errors.Is(err, sql.ErrNoRows) {
			return err
		}

		birthBlock, err := blockchain.ContractBirthBlock(ctx, t.ethConn, t.contractAddress)
		if err != nil {
			return fmt.Errorf("checkLatestSyncedBlock(): %w", err)
		}
		if birthBlock == -1 {
			return fmt.Errorf("checkLatestSyncedBlock(): contract not found")
		}

		t.latestSyncedBlock = birthBlock
	} else {
		t.latestSyncedBlock = syncLog.UpperBlock
	}

	return nil
}

func (t *ContractTokenTracker) prepareBackgroundWorker() error {
	if t.workerCtx != nil {
		return fmt.Errorf("ContractTokenTracker: more than 2 workers is not supported")
	}

	ctx, cancel := context.WithCancel(context.Background())
	t.workerCtx = &contractTokenTrackerWorkerContext{ctx, cancel}
	return nil
}

func (t *ContractTokenTracker) syncUntil(upperBlock int64) error {
	TRANSFER_EVENT_SIG := crypto.Keccak256Hash([]byte(t.contractAbi.Events["Transfer"].Sig)).Bytes()

	filterQuery := ethereum.FilterQuery{
		FromBlock: big.NewInt(t.latestSyncedBlock + 1),
		ToBlock:   big.NewInt(upperBlock),
		Addresses: []common.Address{
			t.contractAddress,
		},
	}

	txs, err := t.ethConn.FilterLogs(t.workerCtx, filterQuery)
	if err != nil {
		return err
	}

	events := map[[32]byte]*blockchain.NftTransferEvent{}
	sort.Slice(txs, func(i, j int) bool {
		return txs[i].BlockNumber < txs[j].BlockNumber && txs[i].TxIndex < txs[j].TxIndex
	})
	for _, tx := range txs {
		if 0 < len(tx.Topics) && bytes.Equal(tx.Topics[0].Bytes(), TRANSFER_EVENT_SIG) {
			event := blockchain.TopicsToNftTransferEvent(tx.Topics)
			events[event.TokenId] = event
		}
	}

	if err := t.syncNftsService.SyncNfts(t.workerCtx, service.SyncNftsCommand{
		LowerBlock:        t.latestSyncedBlock + 1,
		UpperBlock:        upperBlock,
		NftTransferEvents: events,
	}); err != nil {
		return err
	}

	t.latestSyncedBlock = upperBlock
	t.log.Info(fmt.Sprintf("block ~ %v was synced.", t.latestSyncedBlock))

	return nil
}

func (t *ContractTokenTracker) backgroundWorker() {
	nextSyncDelay := time.After(0)

	for {
		select {
		case <-t.workerCtx.Done():
			return

		case <-nextSyncDelay:
			mostRecentBlock, err := t.ethConn.BlockNumber(t.workerCtx)
			if err != nil {
				if errors.Is(err, context.Canceled) {
					return
				}
				panic(err)
			}

			if mostRecentBlock <= uint64(t.latestSyncedBlock) {
				nextSyncDelay = time.After(5 * time.Second)
				continue
			}

			if err := t.syncUntil(min(t.latestSyncedBlock+t.syncBatchSize, int64(mostRecentBlock))); err != nil {
				if errors.Is(err, context.Canceled) {
					return
				}

				panic(err)
			}

			nextSyncDelay = time.After(0)
		}
	}
}

func (t *ContractTokenTracker) Track(ctx context.Context) error {
	t.log.Info(
		fmt.Sprintf("ContractTokenTracker now track transactions in %s after block %d\n",
			common.Bytes2Hex(t.contractAddress[:]), t.latestSyncedBlock))

	if err := t.prepareBackgroundWorker(); err != nil {
		return err
	}

	go t.backgroundWorker()

	return nil
}

func (t *ContractTokenTracker) Stop() error {
	if t.workerCtx != nil {
		t.workerCtx.cancel()
	}

	return nil
}

func New(c *config.ApplicationConfig, queries *persistence.Queries, syncNftsService *service.SyncNftsService, log *zap.Logger) (*ContractTokenTracker, error) {
	ERROR_PREFIX := "ContractTokenTracker.New(): "

	contractAbi, err := abi.JSON(strings.NewReader(string(contract.ContractABI)))
	if err != nil {
		return nil, fmt.Errorf(ERROR_PREFIX+"Abi creation failure: %w", err)
	}

	conn, err := ethclient.Dial(c.BlockchainRpcUrl)
	if err != nil {
		return nil, fmt.Errorf(ERROR_PREFIX+"rpc client creation failure: %w", err)
	}

	eticketTracker := &ContractTokenTracker{
		log:             log,
		ethConn:         conn,
		syncNftsService: syncNftsService,

		contractAbi:     contractAbi,
		contractAddress: common.HexToAddress(c.ContractAddress),

		workerCtx:         nil,
		syncBatchSize:     50,
		latestSyncedBlock: c.MinimumBlock,
	}
	if err := eticketTracker.checkLatestSyncedBlock(context.Background(), queries); err != nil {
		return nil, fmt.Errorf(ERROR_PREFIX+": %w", err)
	}

	return eticketTracker, nil
}
