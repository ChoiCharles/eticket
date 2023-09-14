package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.oao.eticket.application.domain.model.SeatClass;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = PerformanceMapper.class)
interface SeatClassMapper {

  @Mapping(target = "performance", source = "performanceJpaEntity")
  @Mapping(target = "id", expression = "java(SeatClass.SeatClassId.of(jpaEntity.getId()))")
  SeatClass mapToDomainEntity(SeatClassJpaEntity jpaEntity);

  @Mapping(target = "performanceJpaEntity", source = "performance")
  @Mapping(target = "id", source = "id.value")
  SeatClassJpaEntity mapToJpaEntity(SeatClass domainEntity);
}
