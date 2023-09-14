package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.*;
import org.oao.eticket.application.domain.model.SeatClass;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = PerformanceMapper.class)
public interface SeatClassMapper {

  @Named("toDomain")
  @Mapping(target = "id", expression = "java(SeatClass.SeatClassId.of(jpaEntity.getId()))")
//  @Mapping(target = "performance", source = "performanceJpaEntity")
  @Mapping(target = "performance", ignore = true)
  SeatClass mapToDomainEntity(SeatClassJpaEntity jpaEntity);

  @IterableMapping(qualifiedByName = "toDomain")
  List<SeatClass> mapToDomainEntity(List<SeatClassJpaEntity> seatClassJpaEntityList);

  @Named("toJpa")
  @Mapping(target = "id", expression  = "java(null)")
  @Mapping(target = "performanceJpaEntity", ignore = true)
//  @Mapping(target = "performanceJpaEntity", source = "performance")
  SeatClassJpaEntity mapToJpaEntity(SeatClass jpaEntity);

  @IterableMapping(qualifiedByName = "toJpa")
  List<SeatClassJpaEntity> mapToJpaEntity(List<SeatClass> seatClassList);
}
