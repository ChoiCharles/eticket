package org.oao.eticket.application.port.in;

import org.oao.eticket.application.domain.model.Reservation;

public interface ReserveTicketUseCase {
  Reservation reserveTicket(final ReserveTicketCommand cmd);
}
