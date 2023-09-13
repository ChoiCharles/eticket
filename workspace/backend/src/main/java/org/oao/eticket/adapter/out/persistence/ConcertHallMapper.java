package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.oao.eticket.application.domain.model.ConcertHall;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        uses = VenueMapper.class
)
public interface ConcertHallMapper {
    @Mapping(target = "id", expression = "java(ConcertHall.ConcertHallId.of(jpaEntity.getValue()))")
    ConcertHall mapToDomainEntity(ConcertHallJpaEntity jpaEntity);

    ConcertHallJpaEntity mapToJpaEntity(ConcertHall performance);
}
