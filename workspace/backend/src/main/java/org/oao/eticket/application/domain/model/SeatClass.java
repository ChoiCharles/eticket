package org.oao.eticket.application.domain.model;

import lombok.*;

@Data
public class SeatClass {
  SeatClassId id;
  String className;
  Integer price;
  Performance performance;

  @Getter
  @RequiredArgsConstructor(access = AccessLevel.PRIVATE)
  public static class SeatClassId {
    private final int value;

    public static SeatClassId of(final int value) {
      return new SeatClassId(value);
    }
  }
}
