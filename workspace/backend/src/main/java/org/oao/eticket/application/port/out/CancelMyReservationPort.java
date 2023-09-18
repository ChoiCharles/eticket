package org.oao.eticket.application.port.out;

import org.oao.eticket.application.domain.model.Reservation;
import org.oao.eticket.application.port.in.CancelMyReservationCommand;

public interface CancelMyReservationPort {
    Reservation cancelMyReservation(CancelMyReservationCommand command);
}
