package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.oao.eticket.application.domain.model.Performance;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PerformanceMapper {

    // TODO(yoo) : Mapping
    Performance mapToDomainEntity(PerformanceJpaEntity performance);
}
