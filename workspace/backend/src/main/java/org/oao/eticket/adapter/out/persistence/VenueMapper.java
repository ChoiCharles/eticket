package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.oao.eticket.application.domain.model.Venue;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
interface VenueMapper {

  Venue mapToDomainEntity(VenueJpaEntitiy jpaEntity);
}
