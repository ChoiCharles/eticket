package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.oao.eticket.application.domain.model.SeatClass;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = PerformanceMapper.class)
public interface SeatClassMapper {

  @Mapping(target = "id", expression = "java(SeatClass.SeatClassId.of(jpaEntity.getValue()))")
  SeatClass mapToDomainEntity(SeatClassJpaEntity jpaEntity);
}
