package org.oao.eticket.infrastructure.security;

import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

@RequiredArgsConstructor
class UsernamePasswordAuthenticationTokenConverter implements ConcreteAuthenticationConverter {

  private final AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource =
      new WebAuthenticationDetailsSource();

  private final ObjectMapper objectMapper;

  @Value
  private static class RequestBody {
    @NotBlank String username;
    @NotBlank String password;
  }

  @Override
  public Authentication convert(final HttpServletRequest request) {
    try {
      // TODO(meo-s): validate payload
      final var payload = objectMapper.readValue(request.getReader(), RequestBody.class);
      final var username = payload.getUsername();
      final var password = payload.getPassword();

      final var authenticationToken =
          UsernamePasswordAuthenticationToken.unauthenticated(username, password);
      authenticationToken.setDetails(authenticationDetailsSource.buildDetails(request));
      return authenticationToken;
    } catch (DatabindException e) {
      throw new BadAuthenticationRequestException(e.getMessage(), e);
    } catch (Exception e) {
      throw new InternalAuthenticationServiceException(e.getMessage(), e);
    }
  }

  @Override
  public EticketAuthenticationStrategy getSupportedAuthenticationStrategy() {
    return EticketAuthenticationStrategy.BASIC;
  }
}
