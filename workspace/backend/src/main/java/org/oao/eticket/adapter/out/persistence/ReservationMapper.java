package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.oao.eticket.application.domain.model.Reservation;
import org.oao.eticket.application.port.out.CreateReservationCommand;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {UserMapper.class, SeatMapper.class, PerformanceScheduleMapper.class, PerformanceMapper.class})
interface ReservationMapper {

  @Mapping(target = "user", source = "userJpaEntity")
  @Mapping(target = "seat", source = "seatJpaEntity")
  @Mapping(target = "performanceSchedule", source = "performanceScheduleJpaEntity")
  @Mapping(target = "performanceSchedule.performance", source = "performanceScheduleJpaEntity.performanceJpaEntity")  // 수정 필요할 수도 임시 방편
  Reservation mapToDomainEntity(ReservationJpaEntity reservationJpaEntity);

  @Mapping(target = "userJpaEntity", source = "user")
  @Mapping(target = "seatJpaEntity", source = "seat")
  @Mapping(target = "performanceScheduleJpaEntity", source = "performanceSchedule")
  ReservationJpaEntity mapToJpaEntity(Reservation reservationDomainEntity);

  @Mapping(target = "userJpaEntity", source = "user")
  @Mapping(target = "seatJpaEntity", source = "seat")
  @Mapping(target = "performanceScheduleJpaEntity", source = "performanceSchedule")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "reservationTime", ignore = true)
  ReservationJpaEntity mapToJpaEntity(CreateReservationCommand createReservationCommand);
}
