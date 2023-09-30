package org.oao.eticket.application.port.out;


import org.oao.eticket.application.domain.model.SeatClass;

public interface LoadSeatClassPort {
    SeatClass loadSeatClass(LoadSeatClassCommand loadSeatClassCommand);
}
