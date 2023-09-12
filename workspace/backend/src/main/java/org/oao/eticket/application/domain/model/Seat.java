package org.oao.eticket.application.domain.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Seat {
    private Integer seatId;
    private ConcertHall concertHall;
    private String section;
    private String row;
    private String number;
    private Integer positionX;
    private Integer positionY;
}
