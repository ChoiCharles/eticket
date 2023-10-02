package org.oao.eticket.adapter.out.persistence.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;
import org.oao.eticket.adapter.out.persistence.entity.ReservationJpaEntity;
import org.oao.eticket.application.domain.model.Reservation;
import org.oao.eticket.application.port.in.dto.CancelMyReservationCommand;
import org.oao.eticket.application.port.out.CreateReservationCommand;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {UserMapper.class, SeatMapper.class, PerformanceScheduleMapper.class})
public interface ReservationMapper {

  @Mappings({
    @Mapping(target = "user", source = "userJpaEntity"),
    @Mapping(target = "seat", source = "seatJpaEntity"),
    @Mapping(target = "performanceSchedule", source = "performanceScheduleJpaEntity"),
  })
  Reservation mapToDomainEntity(ReservationJpaEntity reservationJpaEntity);

  @Mappings({
    @Mapping(target = "userJpaEntity", source = "user"),
    @Mapping(target = "seatJpaEntity", source = "seat"),
    @Mapping(target = "performanceScheduleJpaEntity", source = "performanceSchedule")
  })
  ReservationJpaEntity mapToJpaEntity(Reservation reservationDomainEntity);

  @Mappings({
    @Mapping(target = "userJpaEntity", source = "user"),
    @Mapping(target = "seatJpaEntity", source = "seat"),
    @Mapping(target = "performanceScheduleJpaEntity", source = "performanceSchedule"),
    @Mapping(target = "id", ignore = true)
  })
  ReservationJpaEntity mapToJpaEntity(CreateReservationCommand createReservationCommand);

  @Mapping(target = "userJpaEntity", source = "user")
  @Mapping(target = "seatJpaEntity", source = "seat")
  @Mapping(target = "performanceScheduleJpaEntity", source = "performanceSchedule")
  ReservationJpaEntity mapToJpaEntity(CancelMyReservationCommand cancelMyReservationCommand);
}
