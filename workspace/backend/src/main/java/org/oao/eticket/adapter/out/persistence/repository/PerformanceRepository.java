package org.oao.eticket.adapter.out.persistence.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.oao.eticket.adapter.out.persistence.entity.PerformanceJpaEntity;
import org.oao.eticket.adapter.out.persistence.mapper.PerformanceMapper;
import org.oao.eticket.application.domain.model.Performance;
import org.oao.eticket.application.port.out.LoadHotPerformancesPort;
import org.oao.eticket.application.port.out.LoadPerformanceDetailPort;
import org.oao.eticket.common.annotation.PersistenceAdapter;
import org.oao.eticket.exception.PerformanceNotFoundException;

import java.util.List;

@PersistenceAdapter
@RequiredArgsConstructor
public class PerformanceRepository implements LoadPerformanceDetailPort, LoadHotPerformancesPort {

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
  public List<Performance> loadHotPerformances() {
    try {
      final var hotPerformances =
          entityManager
              .createQuery(
                  """
                          SELECT p
                          FROM PerformanceJpaEntity p
                          ORDER BY p.id desc
                          """,
                  PerformanceJpaEntity.class)
              .setMaxResults(10)
              .getResultList();

      System.out.println(hotPerformances.toString());
      return performanceMapper.mapToDomainEntity(hotPerformances);
    } catch (Exception e) {
      throw e;
    }
  }
}
