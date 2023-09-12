package org.oao.eticket.application.domain.service;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.*;
import org.oao.eticket.application.port.in.ReserveTicketCommand;
import org.oao.eticket.application.port.in.ReserveTicketUseCase;
import org.oao.eticket.application.port.out.*;
import org.oao.eticket.common.annotation.UseCase;

@UseCase
@RequiredArgsConstructor
public class ReserveTicketService implements ReserveTicketUseCase {

  private final CreateReservationPort createReservationPort;
  private final LoadUserPort loadUserPort;
  private final LoadPerformanceSchedulePort loadPerformanceSchedulePort;
  private final LoadSeatPort loadSeatPort;

  @Override
  public Reservation reserveTicket(final ReserveTicketCommand cmd) {
    User user = loadUserPort.loadById(cmd.getUserId());
    PerformanceSchedule performanceSchedule =
        loadPerformanceSchedulePort.loadById(cmd.getPerformanceScheduleId());
    Seat seat = loadSeatPort.loadById(cmd.getSeatId());
    Integer paymentAmount = cmd.getPaymentAmount();
    TicketStatus ticketStatus = TicketStatus.SOLDOUT;

    Reservation reservation =
        Reservation.builder()
            .user(user)
            .performanceSchedule(performanceSchedule)
            .seat(seat)
            .paymentAmount(paymentAmount)
            .ticketStatus(ticketStatus)
            .build();

    return createReservationPort.createReservation(
        CreateReservationCommand.builder()
            .user(reservation.getUser())
            .performanceSchedule(reservation.getPerformanceSchedule())
            .seat(reservation.getSeat())
            .paymentAmount(reservation.getPaymentAmount())
            .ticketStatus(reservation.getTicketStatus())
            .build());
  }
}
