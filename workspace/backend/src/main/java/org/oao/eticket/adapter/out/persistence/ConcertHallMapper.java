package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.oao.eticket.application.domain.model.ConcertHall;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {VenueMapper.class})
interface ConcertHallMapper {

  @Mapping(target = "venue", source = "venueJpaEntity")
  ConcertHall mapToDomainEntity(ConcertHallJpaEntity concertHallJpaEntity);
}
