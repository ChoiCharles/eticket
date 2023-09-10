package org.oao.eticket.infrastructure.security;

import lombok.Getter;

public enum EticketAuthenticationStrategy {
  UNKNOWN(),
  BASIC(),
  SIGNATURE();

  EticketAuthenticationStrategy() {}

  public static EticketAuthenticationStrategy of(final String strategyName) {
    return switch (strategyName.toLowerCase()) {
      case "basic" -> BASIC;
      case "signature" -> SIGNATURE;
      default -> UNKNOWN;
    };
  }
}
