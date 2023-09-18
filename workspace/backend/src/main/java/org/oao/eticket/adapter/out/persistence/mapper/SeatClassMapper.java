package org.oao.eticket.adapter.out.persistence.mapper;

import org.mapstruct.*;
import org.oao.eticket.adapter.out.persistence.entity.SeatClassJpaEntity;
import org.oao.eticket.application.domain.model.SeatClass;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = PerformanceMapper.class)
public interface SeatClassMapper {

  @Named("seatClassMapToDomain")
  @Mappings({
    @Mapping(target = "id", expression = "java(SeatClass.SeatClassId.of(jpaEntity.getId()))"),
    //  @Mapping(target = "performance", source = "performanceJpaEntity", qualifiedByName =
    // "performanceMapToDomain")
    @Mapping(target = "performance", ignore = true)
  })
  SeatClass mapToDomainEntity(SeatClassJpaEntity jpaEntity);

  @IterableMapping(qualifiedByName = "seatClassMapToDomain")
  List<SeatClass> mapToDomainEntity(List<SeatClassJpaEntity> seatClassJpaEntityList);

  @Named("seatClassMapToJpa")
  @Mappings({
    @Mapping(target = "id", expression = "java(null)"),
    @Mapping(target = "performanceJpaEntity", ignore = true)
    //    @Mapping(
    //        target = "performanceJpaEntity",
    //        source = "performance",
    //        qualifiedByName = "performanceMapToJpa")
  })
  SeatClassJpaEntity mapToJpaEntity(SeatClass jpaEntity);

  @IterableMapping(qualifiedByName = "seatClassMapToJpa")
  List<SeatClassJpaEntity> mapToJpaEntity(List<SeatClass> seatClassList);
}
