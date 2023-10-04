package org.oao.eticket.application.domain.model;

import lombok.*;

import java.util.List;

@Data
@Builder
public class PerformanceScheduleSeatTable {
  PerformanceScheduleId performanceScheduleId;
  SectionId sectionId;

  List<Seat> seats;

  @Getter
  @RequiredArgsConstructor(access = AccessLevel.PRIVATE)
  public static class PerformanceScheduleId {
    private final int value;

    public static PerformanceScheduleSeatTable.PerformanceScheduleId of(final int value) {
      return new PerformanceScheduleSeatTable.PerformanceScheduleId(value);
    }
  }

  @Getter
  @RequiredArgsConstructor(access = AccessLevel.PRIVATE)
  public static class SectionId {
    private final int value;

    public static PerformanceScheduleSeatTable.SectionId of(final int value) {
      return new PerformanceScheduleSeatTable.SectionId(value);
    }
  }
}
