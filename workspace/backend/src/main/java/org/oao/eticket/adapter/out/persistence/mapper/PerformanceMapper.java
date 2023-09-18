package org.oao.eticket.adapter.out.persistence.mapper;

import org.mapstruct.*;
import org.oao.eticket.adapter.out.persistence.entity.PerformanceJpaEntity;
import org.oao.eticket.application.domain.model.Performance;

import java.util.List;
import java.util.Optional;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {
      VenueMapper.class,
      SeatClassMapper.class,
      UserMapper.class,
      PerformanceScheduleMapper.class
    })
public interface PerformanceMapper {

  @Named("performanceMapToDomain")
  @Mappings({
    @Mapping(target = "id", expression = "java(Performance.PerformanceId.of(jpaEntity.getId()))"),
    @Mapping(target = "venue", source = "venueJpaEntity"),
    @Mapping(target = "host", source = "hostJpaEntity"),
    @Mapping(target = "seatClassList", source = "seatClassJpaEntityList"),
    @Mapping(target = "performanceScheduleList", source = "performanceScheduleJpaEntityList")
  })
  Performance mapToDomainEntity(PerformanceJpaEntity jpaEntity);

  @IterableMapping(qualifiedByName = "performanceMapToDomain")
  List<Performance> mapToDomainEntity(List<PerformanceJpaEntity> jpaEntityList);

  @AfterMapping
  default void setPerformance(@MappingTarget Performance performance) {
    Optional.ofNullable(performance.getPerformanceScheduleList())
        .ifPresent(it -> it.forEach(item -> item.setPerformance(performance)));

    Optional.ofNullable(performance.getSeatClassList())
        .ifPresent(it -> it.forEach(item -> item.setPerformance(performance)));
  }

  @Mappings({
    @Mapping(target = "id", source = "id.value"),
    @Mapping(target = "venueJpaEntity", source = "venue"),
    @Mapping(target = "hostJpaEntity", source = "host"),
    @Mapping(target = "seatClassJpaEntityList", source = "seatClassList"),
    @Mapping(target = "performanceScheduleJpaEntityList", source = "performanceScheduleList")
  })
  PerformanceJpaEntity mapToJpaEntity(Performance model);
}
