package org.oao.eticket.domain.application.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.web3j.utils.Numeric;

@Getter
@RequiredArgsConstructor
public class BlockChainWallet {

    public static final BlockChainWallet NULL_WALLET = new BlockChainWallet(null);

    private final byte[] address;

    private String addressHexCache = null;

    @Override
    public boolean equals(final Object other) {
        if (!(other instanceof BlockChainWallet)) {
            return false;
        }

        final var otherAddress = ((BlockChainWallet) other).address;
        for (int i = 0; i < address.length; ++i) {
            if (address[i] != otherAddress[i]) {
                return false;
            }
        }

        return true;
    }

    @Override
    public String toString() {
        if (addressHexCache == null) {
            addressHexCache = address != null ? Numeric.toHexString(address) : "0x00000000000000000000";
        }
        return addressHexCache;
    }

    @Override
    public int hashCode() {
        return toString().hashCode();
    }

    public static BlockChainWallet of(final byte[] address) {
        return new BlockChainWallet(address);
    }

}
