package org.oao.eticket.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Reservation;
import org.oao.eticket.application.domain.model.User;
import org.oao.eticket.application.port.in.CancelMyReservationUseCase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.oao.eticket.exception.TokenVerificationException;
import org.oao.eticket.infrastructure.security.EticketUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@WebAdapter
@RequiredArgsConstructor
public class CancelMyReservationController {

  private final CancelMyReservationUseCase cancelMyReservationUseCase;

  @PostMapping(path = "/reservations/cancel/{id}")
  ResponseEntity<Reservation> cancelMyReservation(
          @PathVariable Integer id, Authentication authentication) {

    Reservation reservation = cancelMyReservationUseCase.cancelMyReservation(id);
    if(reservation == null) return ResponseEntity.status(404).body(null);

    if (!(authentication.getPrincipal() instanceof EticketUserDetails userDetails)) {
      throw new RuntimeException("out");
    }
    if (!(reservation.getUser().getId().equals(userDetails.getId()))) {
      throw ApiException.builder().withStatus(HttpStatus.FORBIDDEN).withMessage("Invalid Permission").build();
    }

    return ResponseEntity.status(200).body(reservation);
  }
}
