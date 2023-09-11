package org.oao.eticket.application.domain.model;

import lombok.Getter;

@Getter
public class RefreshTokenMetadata extends AuthTokenMetadata {

  private final AuthTokenId accessTokenId;
  private final String accessTokenSignature;

  public RefreshTokenMetadata(
      final AuthTokenId tokenId,
      final AuthTokenId accessTokenId,
      final String accessTokenSignature,
      final String signature) {
    super(tokenId, signature);
    this.accessTokenId = accessTokenId;
    this.accessTokenSignature = accessTokenSignature;
  }
}
