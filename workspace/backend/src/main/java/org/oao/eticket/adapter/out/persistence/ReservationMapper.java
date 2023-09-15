package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;
import org.oao.eticket.application.domain.model.Reservation;
import org.oao.eticket.application.port.out.CreateReservationCommand;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {
      UserMapper.class,
      SeatMapper.class,
      PerformanceScheduleMapper.class,
      PerformanceMapper.class
    })
interface ReservationMapper {

  @Mappings({
    @Mapping(target = "user", source = "userJpaEntity"),
    @Mapping(target = "seat", source = "seatJpaEntity"),
    @Mapping(
        target = "performanceSchedule",
        source = "performanceScheduleJpaEntity",
        qualifiedByName = "ScheduleToDomain"),
    //          @Mapping(target = "performanceSchedule.performance", source =
    // "performanceScheduleJpaEntity.performanceJpaEntity")  // 수정 필요할 수도 임시 방편
  })
  Reservation mapToDomainEntity(ReservationJpaEntity reservationJpaEntity);

  @Mappings({
    @Mapping(target = "userJpaEntity", source = "user"),
    @Mapping(target = "seatJpaEntity", source = "seat"),
    @Mapping(
        target = "performanceScheduleJpaEntity",
        source = "performanceSchedule",
        qualifiedByName = "ScheduleToJpa"),
    //          @Mapping(target = "performanceScheduleJpaEntity.performanceJpaEntity", source =
    // "performanceSchedule.performance")  // 수정 필요할 수도 임시 방편
  })
  ReservationJpaEntity mapToJpaEntity(Reservation reservationDomainEntity);

  @Mappings({
    @Mapping(target = "userJpaEntity", source = "user"),
    @Mapping(target = "seatJpaEntity", source = "seat"),
    @Mapping(
        target = "performanceScheduleJpaEntity",
        source = "performanceSchedule",
        qualifiedByName = "ScheduleToJpa"),
    //  @Mapping(target = "performanceScheduleJpaEntity.performanceJpaEntity", source =
    // "performanceSchedule.performance")  // 수정 필요할 수도 임시 방편
    @Mapping(target = "id", ignore = true),
    @Mapping(target = "reservationTime", ignore = true)
  })
  ReservationJpaEntity mapToJpaEntity(CreateReservationCommand createReservationCommand);
}
