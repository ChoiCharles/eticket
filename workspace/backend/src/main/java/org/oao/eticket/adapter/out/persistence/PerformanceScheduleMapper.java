package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.*;
import org.oao.eticket.application.domain.model.PerformanceSchedule;
import org.oao.eticket.application.domain.model.SeatClass;

import java.util.List;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {PerformanceMapper.class})
interface PerformanceScheduleMapper {

  @Named("toDomain")
  @Mapping(target = "performance", source = "performanceJpaEntity")
  PerformanceSchedule mapToDomainEntity(PerformanceScheduleJpaEntity performanceScheduleJpaEntity);

  @IterableMapping(qualifiedByName = "toDomain")
  List<PerformanceSchedule> mapToDomainEntity(List<PerformanceScheduleJpaEntity> performanceScheduleJpaEntityList);

  @Mapping(target = "performanceJpaEntity", source = "performance")
  PerformanceScheduleJpaEntity mapToJpaEntity(PerformanceSchedule performanceSchedule);
}
