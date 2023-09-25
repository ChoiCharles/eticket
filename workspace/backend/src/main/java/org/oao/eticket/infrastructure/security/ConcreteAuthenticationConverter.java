package org.oao.eticket.infrastructure.security;

import org.springframework.security.web.authentication.AuthenticationConverter;

interface ConcreteAuthenticationConverter extends AuthenticationConverter {

  EticketAuthenticationStrategy getSupportedAuthenticationStrategy();
}
