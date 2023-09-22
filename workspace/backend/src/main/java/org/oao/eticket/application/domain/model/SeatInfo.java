package org.oao.eticket.application.domain.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SeatInfo {
    Integer seatId;
    Seat seat;
    SeatClass grade;
    Boolean available;
}
