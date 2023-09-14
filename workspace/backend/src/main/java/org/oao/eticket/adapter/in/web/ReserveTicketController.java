package org.oao.eticket.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.oao.eticket.application.domain.model.Reservation;
import org.oao.eticket.application.domain.model.User;
import org.oao.eticket.application.port.in.ReserveTicketCommand;
import org.oao.eticket.application.port.in.ReserveTicketUseCase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@WebAdapter
@RequiredArgsConstructor
public class ReserveTicketController {

  private final ReserveTicketUseCase reserveTicketUseCase;

  @Value
  static class ReservationDetail {
    @NotNull Integer userId;
    @NotNull Integer performanceScheduleId;
    @NotNull Integer seatId;
    @NotNull Integer paymentAmount;
  }

  @Operation(
      summary = "티켓 예매",
      responses = {
        @ApiResponse(
            responseCode = "201",
            description = "티켓 예매 성공",
            content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
      })
  @PostMapping(path = "/reservations")
  ResponseEntity<Reservation> reserveTicket(
      @Valid @RequestBody ReservationDetail reservationDetail) {

    ReserveTicketCommand command =
        ReserveTicketCommand.builder()
            .userId(User.UserId.of(reservationDetail.userId))
            .performanceScheduleId(reservationDetail.performanceScheduleId)
            .seatId(reservationDetail.seatId)
            .paymentAmount(reservationDetail.paymentAmount)
            .build();

    Reservation reservation = reserveTicketUseCase.reserveTicket(command);

    return ResponseEntity.status(201).body(reservation);
  }
}
