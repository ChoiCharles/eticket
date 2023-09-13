package org.oao.eticket.application.domain.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Value;

import java.util.List;

@Value
public class Performance {
  PerformanceId id;
  String title;
  PerformanceGenre genre;
  String cast;
  String description;
  String posterImagePath;
  Venue venue;
  List<SeatClass> seatClassList;
  User host;
  List<PerformanceSchedule> performanceScheduleList;

  @Getter
  @RequiredArgsConstructor(access = AccessLevel.PRIVATE)
  public static class PerformanceId {
    private final int value;

    public static PerformanceId of(final int value) {
      return new PerformanceId(value);
    }
  }
}
