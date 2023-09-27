package org.oao.eticket.application.domain.model;

import lombok.*;

@Data
@Builder
public class PerformanceScheduleSeatTable {
  PerformanceScheduleId performanceScheduleId;
  ConcertHall concertHall;

  @Getter
  @RequiredArgsConstructor(access = AccessLevel.PRIVATE)
  public static class PerformanceScheduleId {
    private final int value;

    public static PerformanceScheduleSeatTable.PerformanceScheduleId of(final int value) {
      return new PerformanceScheduleSeatTable.PerformanceScheduleId(value);
    }
  }
}