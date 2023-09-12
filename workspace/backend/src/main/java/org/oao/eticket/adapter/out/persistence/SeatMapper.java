package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.oao.eticket.application.domain.model.Seat;

@Mapper
public class SeatMapper {

  private final ConcertHallMapper concertHallMapper;

  Seat mapToDomainEntity(SeatJpaEntity seatJpaEntity) {
    return Seat.builder()
        .seatId(seatJpaEntity.getId())
        .concertHall(concertHallMapper.mapToDomainEntity(seatJpaEntity.getId()))
        .section(seatJpaEntity.getSection())
        .row(seatJpaEntity.getRow())
        .number(seatJpaEntity.getNumber())
        .positionX(seatJpaEntity.getPositionX())
        .positionY(seatJpaEntity.getPositionY())
        .build();
  }

  SeatJpaEntity mapToJpaEntity(Seat seat) {
    return SeatJpaEntity.builder()
        .concertHall(concertHallMapper.mapToJpaEntity(seat.getConcertHall()))
        .section(seat.getSection())
        .row(seat.getRow())
        .number(seat.getNumber())
        .positionX(seat.getPositionX())
        .positionY(seat.getPositionY())
        .build();
  }
}
