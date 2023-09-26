package org.oao.eticket.adapter.out.persistence.mapper;

import org.mapstruct.*;
import org.oao.eticket.adapter.out.persistence.entity.PerformanceJpaEntity;
import org.oao.eticket.application.domain.model.Performance;

import java.util.List;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {
      ConcertHallMapper.class,
      SeatClassMapper.class,
      UserMapper.class,
      PerformanceScheduleMapper.class
    })
public interface PerformanceMapper {

  // 일반적 (공연의 간략한 정보만 포함할 때는 좌석 등급과 공연 스케줄은 생략)
  @Mappings({
    @Mapping(target = "id", expression = "java(Performance.PerformanceId.of(jpaEntity.getId()))"),
    @Mapping(target = "concertHall", source = "concertHallJpaEntity"),
    @Mapping(target = "host", source = "hostJpaEntity"),
    @Mapping(target = "seatClassList", source = "seatClassJpaEntityList"),
    @Mapping(target = "performanceScheduleList", ignore = true)
  })
  Performance mapToDomainEntity(PerformanceJpaEntity jpaEntity);

  List<Performance> mapToDomainEntity(List<PerformanceJpaEntity> jpaEntityList);

  // 공연 세부 사항을 보여줄 때는 좌석 등급과 공연 스케줄 리스트 포함
  @Named("mapToDomainDetail")
  @Mappings({
    @Mapping(target = "id", expression = "java(Performance.PerformanceId.of(jpaEntity.getId()))"),
    @Mapping(target = "concertHall", source = "concertHallJpaEntity"),
    @Mapping(target = "host", source = "hostJpaEntity"),
    @Mapping(target = "seatClassList", source = "seatClassJpaEntityList"),
    @Mapping(target = "performanceScheduleList", source = "performanceScheduleJpaEntityList")
  })
  Performance mapToDomainEntityInDetail(PerformanceJpaEntity jpaEntity);

  @Mappings({
    @Mapping(target = "id", source = "id.value"),
    @Mapping(target = "concertHallJpaEntity", source = "concertHall"),
    @Mapping(target = "hostJpaEntity", source = "host"),
    @Mapping(target = "seatClassJpaEntityList", ignore = true),
    @Mapping(target = "performanceScheduleJpaEntityList", ignore = true)
    //    @Mapping(target = "seatClassJpaEntityList", source = "seatClassList"),
    //    @Mapping(target = "performanceScheduleJpaEntityList", source = "performanceScheduleList")
  })
  PerformanceJpaEntity mapToJpaEntity(Performance model);
}
