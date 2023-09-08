package org.oao.eticket.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
class WebSecurityConfig {

  @Bean
  SecurityFilterChain filterChain(final HttpSecurity http) throws Exception {
    return http.cors(cors -> cors.disable())
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(httpRequests -> httpRequests.anyRequest().permitAll())
        .build();
  }
}
