package org.oao.eticket.application.port.in;

import lombok.Builder;
import lombok.Value;
import org.oao.eticket.application.domain.model.User;

@Value
@Builder
public class ReserveTicketCommand {
  User.UserId userId;
  Integer performanceScheduleId;
  Integer seatId;
  Integer paymentAmount;
}
