package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.oao.eticket.application.domain.model.Performance;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {VenueMapper.class, SeatClassMapper.class, UserMapper.class, PerformanceScheduleMapper.class})
public interface PerformanceMapper {

  @Mapping(target = "id", expression = "java(Performance.PerformanceId.of(jpaEntity.getId()))")
  Performance mapToDomainEntity(PerformanceJpaEntity jpaEntity);

  PerformanceJpaEntity mapToJpaEntity(Performance performance);
}
