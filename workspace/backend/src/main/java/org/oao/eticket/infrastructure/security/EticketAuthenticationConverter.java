package org.oao.eticket.infrastructure.security;

import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationConverter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

@RequiredArgsConstructor
public class EticketAuthenticationConverter implements AuthenticationConverter {

  @Value
  private static class EticketAuthenticationRequestBody {
    @NotBlank String username;
    @NotBlank String password;
  }

  private static final String AUTHENTICATION_STRATEGY_HEADER_NAME = "X-Authentication-Strategy";
  private final ObjectMapper objectMapper;
  private final AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource =
      new WebAuthenticationDetailsSource();

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

    try {
      // TODO(meo-s): validate payload
      final var payload =
          objectMapper.readValue(request.getReader(), EticketAuthenticationRequestBody.class);
      final var username = payload.getUsername();
      final var password = payload.getPassword();

      final var authenticationToken =
          EticketAuthenticationToken.unauthenticated(authenticationStrategy, username, password);
      authenticationToken.setDetails(authenticationDetailsSource.buildDetails(request));

      return authenticationToken.getAuthenticationStrategy() == EticketAuthenticationStrategy.BASIC
          ? authenticationToken.migrateToUsernamePasswordAuthenticationToken()
          : authenticationToken;
    } catch (DatabindException e) {
      throw new BadAuthenticationRequestException(e.getMessage(), e);
    } catch (Exception e) {
      throw new InternalAuthenticationServiceException(e.getMessage(), e);
    }
  }
}
