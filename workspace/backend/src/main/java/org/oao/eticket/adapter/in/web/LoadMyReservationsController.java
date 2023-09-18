package org.oao.eticket.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Reservation;
import org.oao.eticket.application.port.in.LoadMyReservationsUseCase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@WebAdapter
@RequiredArgsConstructor
public class LoadMyReservationsController {

  private final LoadMyReservationsUseCase loadMyReservationsUseCase;

  @GetMapping(path = "/reservations/{userId}")
  ResponseEntity<List<Reservation>> loadMyReservations(@PathVariable Integer userId) {
    List<Reservation> reservations = loadMyReservationsUseCase.loadMyReservations(userId);
    return ResponseEntity.status(200).body(reservations);
  }
}
