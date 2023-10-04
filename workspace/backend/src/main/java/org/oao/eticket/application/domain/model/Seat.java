package org.oao.eticket.application.domain.model;

import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Seat {
  private Integer id;
  private String row;
  private String number;
  private Integer positionX;
  private Integer positionY;
  @Builder.Default
  private SeatStatus seatStatus = SeatStatus.ONSALE;
}
