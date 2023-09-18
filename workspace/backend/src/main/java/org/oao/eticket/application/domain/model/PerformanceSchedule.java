package org.oao.eticket.application.domain.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PerformanceSchedule {
  private Integer id;
  private Performance performance;
  private LocalDateTime startDateTime;
  private Integer runningTime;
  private LocalDateTime ticketingDateTime;
}
