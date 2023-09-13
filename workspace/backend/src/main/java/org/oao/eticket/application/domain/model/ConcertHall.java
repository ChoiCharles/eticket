package org.oao.eticket.application.domain.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConcertHall {
    private Integer id;
    private String name;
    private String hallWholeViewImage;
    private Integer seatCount;
    private Venue venue;
}
