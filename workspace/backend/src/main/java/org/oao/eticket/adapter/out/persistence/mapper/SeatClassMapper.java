package org.oao.eticket.adapter.out.persistence.mapper;

import jdk.jfr.Name;
import org.mapstruct.*;
import org.oao.eticket.adapter.out.persistence.entity.SeatClassJpaEntity;
import org.oao.eticket.application.domain.model.SeatClass;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = PerformanceMapper.class)
public interface SeatClassMapper {

  @Mappings({
    @Mapping(target = "id", expression = "java(SeatClass.SeatClassId.of(jpaEntity.getId()))"),
    @Mapping(target = "performance", ignore = true)
  })
  SeatClass mapToDomainEntityList(SeatClassJpaEntity jpaEntity);

  List<SeatClass> mapToDomainEntityList(List<SeatClassJpaEntity> seatClassJpaEntityList);

  @Mappings({
    @Mapping(target = "id", source = "id.value"),
    //    @Mapping(target = "performanceJpaEntity", source = "performance")
    @Mapping(target = "performanceJpaEntity", ignore = true)
  })
  SeatClassJpaEntity mapToJpaEntity(SeatClass jpaEntity);

  List<SeatClassJpaEntity> mapToJpaEntity(List<SeatClass> seatClassList);
}
