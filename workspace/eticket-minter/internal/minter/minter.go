package minter

import (
	"context"
	"errors"
	"fmt"
	"math/big"
	"os"
	"strconv"
	"sync"
	"time"

	contract "eticket.org/blockchain-minter/internal/contract/generated"
	"eticket.org/blockchain-minter/internal/ethutils"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

type performanceScheduleState int

const (
	NOT_SCHEDULED  = performanceScheduleState(0)
	TRY_SCHEDULING = performanceScheduleState(1)
	SCHEDULED      = performanceScheduleState(2)
)

type MinterInitOpts struct {
	EthRpcUrl          string
	EthChainId         string
	EthPrivateKey      string
	EthContractAddress string
}

type Minter struct {
	ethTxOpts          *bind.TransactOpts
	ethRpcConn         *ethclient.Client
	ethContract        *contract.Contract
	ethContractAddress common.Address

	cachedScheduledPerformances sync.Map
}

func (m *Minter) MinterAddress() common.Address {
	return m.ethTxOpts.From
}

func (m *Minter) IsPerformanceScheduled(ctx context.Context, performanceScheduleId uint32) (bool, error) {
	for {
		switch state, _ := m.cachedScheduledPerformances.LoadOrStore(performanceScheduleId, NOT_SCHEDULED); state {
		case NOT_SCHEDULED:
			if scheduled, err := m.ethContract.IsPerformanceScheduled(&bind.CallOpts{Context: ctx}, performanceScheduleId); err != nil {
				return false, err
			} else {
				if scheduled {
					m.cachedScheduledPerformances.Store(performanceScheduleId, SCHEDULED)
				}
				return scheduled, err
			}

		case SCHEDULED:
			return true, nil

		case TRY_SCHEDULING:
			select {
			case <-time.After(100 * time.Millisecond):
			case <-ctx.Done():
				return false, fmt.Errorf("minter.IsPerformanceScheduled(): %w", context.Canceled)
			}
		}
	}
}

func (m *Minter) doSchedulePerformance(ctx context.Context, performanceScheduleId uint32, ticketExpirationTime time.Time) error {
	const errPrefix = "minter.schedulePerformance(): "

	txOpts := &bind.TransactOpts{
		Context:  ctx,
		Signer:   m.ethTxOpts.Signer,
		From:     m.ethTxOpts.From,
		GasPrice: big.NewInt(1e+6),
		GasLimit: 1e+6,
	}

	tx, err := m.ethContract.SchedulePerformance(txOpts, performanceScheduleId, big.NewInt(ticketExpirationTime.Unix()))
	if err != nil {
		return fmt.Errorf(errPrefix+"%w", err)
	}

	if receipt, err := ethutils.TxReceipt(ctx, m.ethRpcConn, tx.Hash(), 500*time.Millisecond); err != nil {
		return fmt.Errorf(errPrefix+"%w", context.Canceled)
	} else {
		if ethutils.TxSucceeded(receipt) {
			return nil
		} else {
			return errors.New(errPrefix + "transaction failed")
		}
	}
}

func (m *Minter) schedulePerformance(ctx context.Context, performanceScheduleId uint32, ticketExpirationTime time.Time) error {
	const errPrefix = "minter.schedulePerformance(): "

	for {
		switch state, _ := m.cachedScheduledPerformances.LoadOrStore(performanceScheduleId, NOT_SCHEDULED); state {
		case TRY_SCHEDULING:
			select {
			case <-time.After(100 * time.Millisecond):
				continue
			case <-ctx.Done():
				return fmt.Errorf(errPrefix+"%w", context.Canceled)
			}

		case NOT_SCHEDULED:
			if !m.cachedScheduledPerformances.CompareAndSwap(performanceScheduleId, NOT_SCHEDULED, TRY_SCHEDULING) {
				continue
			}

			if scheduled, err := m.ethContract.IsPerformanceScheduled(&bind.CallOpts{Context: ctx}, performanceScheduleId); !scheduled {
				if err != nil && errors.Is(err, context.Canceled) {
					m.cachedScheduledPerformances.Store(performanceScheduleId, NOT_SCHEDULED)
					return fmt.Errorf(errPrefix+"%w", err)
				}

				if err := m.doSchedulePerformance(ctx, performanceScheduleId, ticketExpirationTime); err != nil {
					m.cachedScheduledPerformances.Store(performanceScheduleId, NOT_SCHEDULED)
					return fmt.Errorf(errPrefix+"%w", err)
				}
			}

			m.cachedScheduledPerformances.Store(performanceScheduleId, SCHEDULED)
		}

		return nil
	}
}

func (m *Minter) validateOwnership(ctx context.Context, account common.Address, performanceScheduleId, seatId uint32) error {
	owner, err := m.ethContract.TicketOwnerOf(&bind.CallOpts{Pending: true}, performanceScheduleId, seatId)
	if err != nil {
		return fmt.Errorf("minter.validateOwnership(): %w", err)
	}
	if owner.Cmp(account) != 0 {
		return errors.New("minter.validateOwnership(): owner mismatch")
	}
	return nil
}

func (m *Minter) doMintTicket(ctx context.Context, recipient common.Address, performanceScheduleId, seatId uint32) error {
	txOpts := &bind.TransactOpts{
		Context:  ctx,
		From:     m.ethTxOpts.From,
		Signer:   m.ethTxOpts.Signer,
		GasPrice: big.NewInt(1e+6),
		GasLimit: 1e+6,
	}

	tx, err := m.ethContract.MintTicket(txOpts, recipient, performanceScheduleId, seatId, "")
	if err != nil {
		return err
	}

	receipt, err := ethutils.TxReceipt(ctx, m.ethRpcConn, tx.Hash(), 500*time.Millisecond)
	if err == nil && !ethutils.TxSucceeded(receipt) {
		return nil
	} else {
		return err
	}
}

func (m *Minter) MintTicket(ctx context.Context, recipient common.Address, performanceScheduleId, seatId uint32, ticketExpirationTime time.Time) error {
	const errPrefix = "minter.MintTicket(): "

	if scheduled, err := m.IsPerformanceScheduled(ctx, performanceScheduleId); err != nil {
		return fmt.Errorf(errPrefix+"%w", err)
	} else {
		if !scheduled {
			if err := m.schedulePerformance(ctx, performanceScheduleId, ticketExpirationTime); err != nil {
				return fmt.Errorf(errPrefix+"%w", err)
			}
		}
	}

	minted, err := m.ethContract.IsTicketMinted(&bind.CallOpts{Pending: true}, performanceScheduleId, seatId)
	if err != nil {
		return fmt.Errorf(errPrefix+"%w", err)
	}

	if minted {
		if err := m.validateOwnership(ctx, recipient, performanceScheduleId, seatId); err != nil {
			return errors.New(errPrefix + "ticket already minted, but owner is other account")
		}
	} else {
		if err := m.doMintTicket(ctx, recipient, performanceScheduleId, seatId); err != nil {
			return fmt.Errorf(errPrefix+"%w", err)
		}
	}

	return nil
}

func NewWithEnvvar() (*Minter, error) {
	const ERR_PREFIX = "minter.NewWithEnvvar(): "

	ethRpcUrl := os.Getenv("ETICKET_ETH_RPC_URL")
	if len(ethRpcUrl) == 0 {
		return nil, errors.New(ERR_PREFIX + "missing required environment variable \"ETICKET_ETH_RPC_URL\"")
	}

	ethChainId := os.Getenv("ETICKET_ETH_CHAIN_ID")
	if len(ethChainId) == 0 {
		return nil, errors.New(ERR_PREFIX + "missing required environment variable \"ETICKET_ETH_CHAIN_ID\"")
	}

	ethPrivateKey := os.Getenv("ETICKET_ETH_PRIVATE_KEY")
	if len(ethPrivateKey) == 0 {
		return nil, errors.New(ERR_PREFIX + "missing required environment variable \"ETICKET_ETH_PRIVATE_KEY\"")
	}

	ethContractAddress := os.Getenv("ETICKET_ETH_CONTRACT_ADDRESS")
	if len(ethContractAddress) == 0 {
		return nil, errors.New(ERR_PREFIX + "missing required environment variable \"ETICKET_ETH_CONTRACT_ADDRESS\"")
	}

	return New(MinterInitOpts{
		EthRpcUrl:          ethRpcUrl,
		EthChainId:         ethChainId,
		EthPrivateKey:      ethPrivateKey,
		EthContractAddress: ethContractAddress,
	})
}

func New(opts MinterInitOpts) (*Minter, error) {
	const ERR_PREFIX = "minter.New(): "

	ethPrivateKey, err := crypto.ToECDSA(hexutil.MustDecode(opts.EthPrivateKey))
	if err != nil {
		return nil, fmt.Errorf(ERR_PREFIX+": %w", err)
	}

	ethChainId, err := strconv.ParseUint(opts.EthChainId, 10, 64)
	if err != nil {
		return nil, fmt.Errorf(ERR_PREFIX+": %w", err)
	}

	ethTxOpts, err := bind.NewKeyedTransactorWithChainID(ethPrivateKey, big.NewInt(int64(ethChainId)))
	if err != nil {
		return nil, fmt.Errorf(ERR_PREFIX+": %w", err)
	}

	ethRpcConn, err := ethclient.Dial(opts.EthRpcUrl)
	if err != nil {
		return nil, fmt.Errorf(ERR_PREFIX+": %w", err)
	}

	eticketContract, err := contract.NewContract(common.HexToAddress(opts.EthContractAddress), ethRpcConn)
	if err != nil {
		return nil, fmt.Errorf(ERR_PREFIX+": %w", err)
	}

	return &Minter{
		ethTxOpts:          ethTxOpts,
		ethRpcConn:         ethRpcConn,
		ethContractAddress: common.HexToAddress(opts.EthContractAddress),
		ethContract:        eticketContract,
	}, nil
}
