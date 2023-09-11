package org.oao.eticket.application.domain.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public abstract class AuthTokenMetadata {
  private final AuthTokenId tokenId;
  private final String signature;
}
