package org.oao.eticket.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.oao.eticket.application.domain.model.Reservation;
import org.oao.eticket.application.port.out.CreateReservationCommand;

import java.time.LocalDateTime;

@Mapper
@RequiredArgsConstructor
public class ReservationMapper {

  private final UserMapper userMapper;
  private final PerformanceScheduleMapper performanceScheduleMapper;
  private final SeatMapper seatMapper;

  Reservation mapToDomainEntity(ReservationJpaEntity reservationJpaEntity) {
    return Reservation.builder()
        .reservationId(reservationJpaEntity.getId())
        .user(userMapper.mapToDomainEntity(reservationJpaEntity.getUser()))
        .performanceSchedule(
            performanceScheduleMapper.mapToDomainEntity(
                reservationJpaEntity.getPerformanceSchedule()))
        .seat(seatMapper.mapToDomainEntity(reservationJpaEntity.getSeat()))
        .paymentAmount(reservationJpaEntity.getPaymentAmount())
        .ticketStatus(reservationJpaEntity.getTicketStatus())
        .reservationTime(reservationJpaEntity.getReservationTime())
        .build();
  }

  ReservationJpaEntity mapToJpaEntity(CreateReservationCommand cmd) {
    UserJpaEntity userJpaEntity = userMapper.mapToJpaEntity(cmd.getUser());
    PerformanceScheduleJpaEntity performanceScheduleJpaEntity =
        performanceScheduleMapper.mapToJpaEntity(cmd.getPerformanceSchedule());
    SeatJpaEntity seatJpaEntity = seatMapper.mapToJpaEntity(cmd.getSeat());

    return ReservationJpaEntity.builder()
        .user(userJpaEntity)
        .performanceSchedule(performanceScheduleJpaEntity)
        .seat(seatJpaEntity)
        .paymentAmount(cmd.getPaymentAmount())
        .ticketStatus(cmd.getTicketStatus())
        .reservationTime(LocalDateTime.now())
        .build();
  }
}
