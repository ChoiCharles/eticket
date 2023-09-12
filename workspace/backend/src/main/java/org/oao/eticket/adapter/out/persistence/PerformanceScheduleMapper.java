package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.oao.eticket.application.domain.model.PerformanceSchedule;

@Mapper
public class PerformanceScheduleMapper {

  private final PerformanceMapper performanceMapper;

  public PerformanceSchedule mapToDomainEntity(
      PerformanceScheduleJpaEntity performanceScheduleJpaEntity) {
    return PerformanceSchedule.builder()
        .performanceScheduleId(performanceScheduleJpaEntity.getId())
        .performance(
            performanceMapper.mapToDomainEntity(
                performanceScheduleJpaEntity.getPerformanceJpaEntity()))
        .startDateTime((performanceScheduleJpaEntity.getStartDateTime()))
        .runningTime(performanceScheduleJpaEntity.getRunningTime())
        .ticketingDateTime(performanceScheduleJpaEntity.getTicketingDateTime())
        .build();
  }

  public PerformanceScheduleJpaEntity mapToJpaEntity(PerformanceSchedule performanceSchedule) {
    return PerformanceScheduleJpaEntity.builder()
        .performanceJpaEntity(
            performanceMapper.mapToJpaEntity(performanceSchedule.getPerformance()))
        .startDateTime(performanceSchedule.getStartDateTime())
        .runningTime(performanceSchedule.getRunningTime())
        .ticketingDateTime(performanceSchedule.getTicketingDateTime())
        .build();
  }
}
