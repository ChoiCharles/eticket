package org.oao.eticket.application.domain.model;

import lombok.Getter;

@Getter
public class AccessTokenMetadata extends AuthTokenMetadata {
  public AccessTokenMetadata(final AuthTokenId tokenId, final String signature) {
    super(tokenId, signature);
  }
}
