package org.oao.eticket.application.port.out;

import org.oao.eticket.application.domain.model.Reservation;

public interface CreateReservationPort {
    Reservation createReservation(CreateReservationCommand cmd);
}
