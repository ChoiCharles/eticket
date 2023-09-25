package org.oao.eticket.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.in.CreateChallengeWordUseCase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.oao.eticket.exception.ExternalServiceException;
import org.oao.eticket.infrastructure.security.EticketUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;

import java.net.URI;

@WebAdapter
@RequiredArgsConstructor
class CreateChallengeWordController {

  private record Response(String payload) {}

  private final CreateChallengeWordUseCase createChallengeWordUseCase;

  private EticketUserDetails obtainUserDetails(final Authentication authentication) {
    if (authentication == null) {
      throw ApiException.builder()
          .withStatus(HttpStatus.UNAUTHORIZED)
          .withMessage("only authorized user can create challenge word")
          .build();
    }

    if (!(authentication.getPrincipal() instanceof EticketUserDetails userDetails)) {
      throw ApiException.builder()
          .withStatus(HttpStatus.INTERNAL_SERVER_ERROR)
          .withMessage("something was wrong")
          .build();
    }

    return userDetails;
  }

  @PostMapping("/auth/challenge")
  ResponseEntity<?> createChallengeWord(final Authentication authentication) {
    try {
      final var userDetails = obtainUserDetails(authentication);
      final var challengeWord = createChallengeWordUseCase.create(userDetails.getId());
      return ResponseEntity.created(URI.create("/auth/challenge/" + userDetails.getId()))
          .body(new Response(challengeWord));
    } catch (ExternalServiceException e) {
      throw ApiException.builder()
          .withCause(e)
          .withStatus(HttpStatus.INTERNAL_SERVER_ERROR)
          .withMessage("server is unstable")
          .build();
    } catch (Exception e) {
      throw ApiException.builder()
          .withCause(e)
          .withStatus(HttpStatus.INTERNAL_SERVER_ERROR)
          .withMessage("something was wrong")
          .build();
    }
  }
}
