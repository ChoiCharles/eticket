package org.oao.eticket.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Reservation;
import org.oao.eticket.application.port.in.CancelMyReservationUseCase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@WebAdapter
@RequiredArgsConstructor
public class CancelMyReservationController {

  private final CancelMyReservationUseCase cancelMyReservationUseCase;

  @PostMapping(path = "/reservations/cancel/{id}")
  ResponseEntity<Reservation> cancelMyReservation(
          @PathVariable Integer id) {

    Reservation reservation = cancelMyReservationUseCase.cancelMyReservation(id);
    if(reservation == null) return ResponseEntity.status(404).body(null);
    return ResponseEntity.status(200).body(reservation);
  }
}
