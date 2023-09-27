package org.oao.eticket.application.domain.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Seat {
  private Integer id;
  private String row;
  private String number;
  private Integer positionX;
  private Integer positionY;
}
