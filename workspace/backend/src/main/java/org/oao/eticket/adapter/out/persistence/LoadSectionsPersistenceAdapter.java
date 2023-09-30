package org.oao.eticket.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.adapter.out.persistence.mapper.SectionMapper;
import org.oao.eticket.adapter.out.persistence.repository.PerformanceScheduleRepository;
import org.oao.eticket.adapter.out.persistence.repository.SectionRepository;
import org.oao.eticket.application.domain.model.Section;
import org.oao.eticket.application.port.out.LoadPerformanceScheduleSectionsPort;
import org.oao.eticket.common.annotation.PersistenceAdapter;

import java.util.List;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadSectionsPersistenceAdapter implements LoadPerformanceScheduleSectionsPort {
  private final PerformanceScheduleRepository performanceScheduleRepository;
  private final SectionRepository sectionRepository;
  private final SectionMapper sectionMapper;

  @Override
  public List<Section> loadSections(Integer performanceScheduleId) {
    final var sectionJpaEntities =
        sectionRepository.findAllByConcertHallJpaEntity(
            performanceScheduleRepository.findConcertHallById(performanceScheduleId));
    return sectionMapper.mapToDomainEntity(sectionJpaEntities);
  }
}
