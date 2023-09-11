package org.oao.eticket.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.in.CreateAuthTokenUseCase;
import org.oao.eticket.application.port.out.LoadUserPort;
import org.oao.eticket.infrastructure.security.EticketAuthenticationConverter;
import org.oao.eticket.infrastructure.security.EticketAuthenticationResultHandler;
import org.oao.eticket.infrastructure.security.EticketUserDetailsService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.util.List;

@Configuration
@RequiredArgsConstructor
class SpringSecurityConfig {

  private final ApplicationContext context;

  @Bean
  UserDetailsService userDetailsService(final LoadUserPort loadUserPort) {
    return new EticketUserDetailsService(loadUserPort);
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  @Qualifier("eticketAuthenticationProvider")
  AuthenticationProvider eticketDaoAuthenticationProvider(
      final UserDetailsService userDetailsService, final PasswordEncoder passwordEncoder) {

    final var authenticationProvider = new DaoAuthenticationProvider();
    authenticationProvider.setUserDetailsService(userDetailsService);
    authenticationProvider.setPasswordEncoder(passwordEncoder);
    authenticationProvider.setHideUserNotFoundExceptions(true);
    return authenticationProvider;
  }

  @Bean("eticketAuthenticationManager")
  AuthenticationManager eticketAuthenticationManager(
      @Qualifier("eticketAuthenticationProvider")
          final List<AuthenticationProvider> authenticationProviders) {

    final var providerManager = new ProviderManager(authenticationProviders);
    providerManager.setEraseCredentialsAfterAuthentication(true);
    return providerManager;
  }

  @Bean("eticketAuthenticationFilter")
  AuthenticationFilter eticketAuthenticationFilter(
      final CreateAuthTokenUseCase createAuthTokenUseCase,
      final AuthenticationManager eticketAuthenticationManager) {

    final var authenticationFilter =
        new AuthenticationFilter(
            eticketAuthenticationManager,
            new EticketAuthenticationConverter(context.getBean(ObjectMapper.class)));

    final var authenticationResultHandler =
        new EticketAuthenticationResultHandler(createAuthTokenUseCase);
    authenticationFilter.setSuccessHandler(authenticationResultHandler);
    authenticationFilter.setFailureHandler(authenticationResultHandler);

    authenticationFilter.setRequestMatcher(new AntPathRequestMatcher("/auth/signin", "POST"));

    return authenticationFilter;
  }

  @Bean
  SecurityFilterChain filterChain(final HttpSecurity http) throws Exception {
    final var eticketAuthenticationFilter =
        context.getBean("eticketAuthenticationFilter", AuthenticationFilter.class);

    return http.cors(cors -> cors.disable())
        .csrf(csrf -> csrf.disable())
        .addFilterBefore(eticketAuthenticationFilter, ExceptionTranslationFilter.class)
        .authorizeHttpRequests(httpRequests -> httpRequests.anyRequest().permitAll())
        .build();
  }
}
