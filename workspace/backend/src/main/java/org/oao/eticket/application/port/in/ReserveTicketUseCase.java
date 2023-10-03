package org.oao.eticket.application.port.in;

import org.oao.eticket.application.domain.model.Reservation;
import org.oao.eticket.application.port.in.dto.ReserveTicketCommand;

public interface ReserveTicketUseCase {
  Reservation reserveTicket(final ReserveTicketCommand cmd);
}
