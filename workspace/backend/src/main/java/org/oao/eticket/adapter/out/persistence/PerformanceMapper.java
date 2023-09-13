package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.oao.eticket.application.domain.model.Performance;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {VenueMapper.class, SeatClassMapper.class, UserMapper.class, PerformanceScheduleMapper.class})
interface PerformanceMapper {

  @Mapping(target = "venue", source = "venueJpaEntity")
  @Mapping(target = "host", source = "hostJpaEntity")
  Performance mapToDomainEntity(PerformanceJpaEntity jpaEntity);

  @Mapping(target = "venueJpaEntitiy", source = "venue")
  @Mapping(target = "hostJpaEntity", source = "host")
  PerformanceJpaEntity mapToJpaEntity(Performance performance);
}
