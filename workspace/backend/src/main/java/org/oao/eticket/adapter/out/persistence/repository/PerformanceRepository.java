package org.oao.eticket.adapter.out.persistence.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.oao.eticket.adapter.out.persistence.entity.PerformanceJpaEntity;
import org.oao.eticket.adapter.out.persistence.mapper.PerformanceMapper;
import org.oao.eticket.application.domain.model.Performance;
import org.oao.eticket.application.domain.model.PerformanceSummary;
import org.oao.eticket.application.port.out.LoadHotPerformancesPort;
import org.oao.eticket.application.port.out.LoadPerformanceDetailPort;
import org.oao.eticket.application.port.out.LoadUpcomingPerformancesPort;
import org.oao.eticket.common.annotation.PersistenceAdapter;
import org.oao.eticket.exception.PerformanceNotFoundException;

import java.util.List;

@PersistenceAdapter
@RequiredArgsConstructor
public class PerformanceRepository
    implements LoadPerformanceDetailPort, LoadHotPerformancesPort, LoadUpcomingPerformancesPort {

  private final PerformanceMapper performanceMapper;

  @PersistenceContext private final EntityManager entityManager;

  @Override
  public Performance loadById(Performance.PerformanceId performanceId) {
    try {
      final var performanceJpaEntity =
          entityManager
              .createQuery(
                  """
                          SELECT p
                          FROM PerformanceJpaEntity p
                          WHERE p.id=:performanceId
                          """,
                  PerformanceJpaEntity.class)
              .setParameter("performanceId", performanceId.getValue())
              .getSingleResult();
      return performanceMapper.mapToDomainEntity(performanceJpaEntity);
    } catch (NoResultException e) {
      throw new PerformanceNotFoundException(String.valueOf(performanceId.getValue()), e);
    } catch (Exception e) {
      throw e;
    }
  }

  @Override
  public List<PerformanceSummary> loadHotPerformances() {
    try {
      final var queryResults =
          entityManager
              .createQuery(
                  """
                          SELECT p
                          FROM PerformanceJpaEntity p
                          ORDER BY p.id DESC
                          """,
                  PerformanceJpaEntity.class)
              .setMaxResults(10)
              .getResultList();
      // 빈 결과물이면 없다고 띄우기
      if (queryResults.isEmpty()) {
        throw new PerformanceNotFoundException("인기 있는 공연이 존재 하지 않습니다.");
      }
      return performanceMapper.mapToSummaryDomainEntity(queryResults);
    } catch (Exception e) {
      throw e;
    }
  }

  @Override
  public List<PerformanceSummary> loadUpcomings() {
    try {
      final var queryResults =
          entityManager
              .createQuery(
                  """
                      SELECT ps.performanceJpaEntity
                      FROM PerformanceScheduleJpaEntity ps
                      WHERE ps.ticketingDateTime > CURRENT_TIMESTAMP
                      ORDER BY ps.ticketingDateTime ASC
                      """,
                  PerformanceJpaEntity.class)
              .setMaxResults(10)
              .getResultList();
      if (queryResults.isEmpty()) {
        throw new PerformanceNotFoundException("오픈 예정인 공연이 존재 하지 않습니다.");
      }
      return performanceMapper.mapToSummaryDomainEntity(queryResults);
    } catch (IllegalArgumentException e) {
      // QUERY 오타
      throw e;
    } catch (Exception e) {
      throw e;
    }
  }
}
