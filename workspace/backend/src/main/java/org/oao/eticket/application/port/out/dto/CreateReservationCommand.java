package org.oao.eticket.application.port.out.dto;

import lombok.Builder;
import lombok.Value;
import org.oao.eticket.application.domain.model.PerformanceSchedule;
import org.oao.eticket.application.domain.model.Seat;
import org.oao.eticket.application.domain.model.TicketStatus;
import org.oao.eticket.application.domain.model.User;

import java.time.LocalDateTime;

@Value
@Builder
public class CreateReservationCommand {
  User user;
  PerformanceSchedule performanceSchedule;
  Seat seat;
  Integer paymentAmount;
  TicketStatus ticketStatus;
  LocalDateTime reservationTime;
  LocalDateTime cancellationTime;

}
