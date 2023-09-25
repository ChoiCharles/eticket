package org.oao.eticket.common;

import org.web3j.crypto.Keys;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

import java.security.SignatureException;
import java.util.Optional;

public class EtherUtils {

  public static Sign.SignatureData getSignatureDataFromPersonalSign(final String personalSign) {
    final var r = personalSign.substring(0, 66);
    final var s = "0x" + personalSign.substring(66, 130);
    final var v = "0x" + personalSign.substring(130, 132);

    return new Sign.SignatureData(
        Numeric.hexStringToByteArray(v)[0],
        Numeric.hexStringToByteArray(r),
        Numeric.hexStringToByteArray(s));
  }

  public static Optional<String> recoverAddressFromPersonalSign(
      final String personalSign, final String messageInHex) {

    try {
      final var messageBytes = Numeric.hexStringToByteArray(messageInHex);
      final var messageHash = Sign.getEthereumMessageHash(messageBytes);

      final var pubKey =
          Sign.signedMessageHashToKey(messageHash, getSignatureDataFromPersonalSign(personalSign));

      return Optional.of("0x" + Keys.getAddress(pubKey));
    } catch (SignatureException e) {
      return Optional.empty();
    }
  }
}
