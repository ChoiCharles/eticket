package org.oao.eticket.infrastructure.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

class EticketSignatureAuthenticationProvider implements AuthenticationProvider {

  @Override
  public Authentication authenticate(final Authentication unknownAuthentication)
      throws AuthenticationException {

    if (!(unknownAuthentication instanceof EticketAuthenticationToken authentication)) {
      throw new BadAuthenticationRequestException(
          "Unsupported authentication: " + unknownAuthentication.getClass().getName());
    }

    if (authentication.getAuthenticationStrategy() != EticketAuthenticationStrategy.SIGNATURE) {
      throw new BadAuthenticationRequestException(
          "Unsupported authentication strategy: "
              + authentication.getAuthenticationStrategy().name());
    }


  }

  @Override
  public boolean supports(final Class<?> authentication) {
    return authentication.equals(EticketAuthenticationToken.class);
  }
}
