package org.oao.eticket.infrastructure.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationConverter;

import java.util.HashMap;
import java.util.Map;

class EticketAuthenticationConverter implements AuthenticationConverter {

  private static final String AUTHENTICATION_STRATEGY_HEADER_NAME = "X-Authentication-Strategy";
  private final Map<EticketAuthenticationStrategy, AuthenticationConverter> converters;

  private EticketAuthenticationConverter(final ObjectMapper objectMapper) {
    this.converters = new HashMap<>();
    this.converters.put(
        EticketAuthenticationStrategy.BASIC,
        new UsernamePasswordAuthenticationTokenConverter(objectMapper));
    this.converters.put(EticketAuthenticationStrategy.SIGNATURE, null);
  }

  @Override
  public Authentication convert(final HttpServletRequest request) {
    final var authenticationStrategyName = request.getHeader(AUTHENTICATION_STRATEGY_HEADER_NAME);
    if (authenticationStrategyName == null) {
      throw new BadAuthenticationRequestException(
          "Missing required header: " + AUTHENTICATION_STRATEGY_HEADER_NAME);
    }

    final var authenticationStrategy = EticketAuthenticationStrategy.of(authenticationStrategyName);
    if (authenticationStrategy == EticketAuthenticationStrategy.UNKNOWN) {
      throw new BadAuthenticationRequestException(
          "Unsupported authentication strategy: " + authenticationStrategyName);
    }
  }
}
