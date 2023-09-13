package org.oao.eticket.application.domain.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Value;

@Value
public class Performance {
  PerformanceId id;
  String cast;
  PerformanceGenre genre;
  String description;
  String posterImagePath;
  // Venue
  // SeatClass
  // Host user
  // Performance Schedule

  @Getter
  @RequiredArgsConstructor(access = AccessLevel.PRIVATE)
  public static class PerformanceId {
    private final int id;

    public static PerformanceId of(final int id) {
      return new PerformanceId(id);
    }
  }
}
