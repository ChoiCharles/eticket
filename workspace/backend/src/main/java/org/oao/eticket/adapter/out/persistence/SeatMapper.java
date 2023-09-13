package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.oao.eticket.application.domain.model.Seat;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {ConcertHallMapper.class})
interface SeatMapper {

  @Mapping(target = "concertHall", source = "concertHallJpaEntity")
  Seat mapToDomainEntity(SeatJpaEntity seatJpaEntity);

  @Mapping(target = "concertHallJpaEntity", source = "concertHall")
  SeatJpaEntity mapToJpaEntity(Seat seat);
}
