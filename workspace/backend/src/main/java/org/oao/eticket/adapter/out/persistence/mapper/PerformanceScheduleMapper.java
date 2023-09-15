package org.oao.eticket.adapter.out.persistence.mapper;

import org.mapstruct.*;
import org.oao.eticket.adapter.out.persistence.entity.PerformanceScheduleJpaEntity;
import org.oao.eticket.application.domain.model.PerformanceSchedule;

import java.util.List;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {PerformanceMapper.class})
public interface PerformanceScheduleMapper {

  @Named("ScheduleToDomain")
  //  @Mapping(target = "performance", source = "performanceJpaEntity", qualifiedByName =
  // "performanceMapToDomain")
  @Mapping(target = "performance", ignore = true)
  PerformanceSchedule mapToDomainEntity(PerformanceScheduleJpaEntity performanceScheduleJpaEntity);

  @IterableMapping(qualifiedByName = "ScheduleToDomain")
  List<PerformanceSchedule> mapToDomainEntity(
      List<PerformanceScheduleJpaEntity> performanceScheduleJpaEntityList);

  @Named("ScheduleToJpa")
  //  @Mapping(target = "performanceJpaEntity", source = "performance")
  @Mapping(target = "performanceJpaEntity", ignore = true)
  PerformanceScheduleJpaEntity mapToJpaEntity(PerformanceSchedule performanceSchedule);

  @IterableMapping(qualifiedByName = "ScheduleToJpa")
  List<PerformanceScheduleJpaEntity> mapToJpaEntity(
      List<PerformanceSchedule> performanceScheduleJpaEntityList);
}
