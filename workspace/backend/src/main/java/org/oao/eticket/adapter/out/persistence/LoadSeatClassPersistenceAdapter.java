package org.oao.eticket.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.adapter.out.persistence.entity.SectionAndSeatClassRelationJpaEntity;
import org.oao.eticket.adapter.out.persistence.mapper.SeatClassMapper;
import org.oao.eticket.adapter.out.persistence.repository.SectionAndSeatClassRelationRepository;
import org.oao.eticket.application.domain.model.SeatClass;
import org.oao.eticket.application.port.out.LoadSeatClassCommand;
import org.oao.eticket.application.port.out.LoadSeatClassPort;
import org.oao.eticket.common.annotation.PersistenceAdapter;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadSeatClassPersistenceAdapter implements LoadSeatClassPort {
  private final SectionAndSeatClassRelationRepository sectionAndSeatClassRelationRepository;
  private final SeatClassMapper seatClassMapper;

  @Override
  public SeatClass loadSeatClass(LoadSeatClassCommand loadSeatClassCommand) {
    return seatClassMapper.mapToDomainEntity(
        sectionAndSeatClassRelationRepository.findSeatClassBySectionAndPerformance(
            loadSeatClassCommand.getSectionId(), loadSeatClassCommand.getPerformanceScheduleId()));
  }
}
