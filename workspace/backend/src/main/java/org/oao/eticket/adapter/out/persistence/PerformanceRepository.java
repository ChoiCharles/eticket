package org.oao.eticket.adapter.out.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Performance;
import org.oao.eticket.application.port.out.LoadPerformanceDetailPort;
import org.oao.eticket.common.annotation.PersistenceAdapter;

@PersistenceAdapter
@RequiredArgsConstructor
public class PerformanceRepository implements LoadPerformanceDetailPort {
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
              .setParameter("id", performanceId.getValue())
              .getSingleResult();
      return performanceMapper.mapToDomainEntity(performanceJpaEntity);
    } catch (Exception e) {
      // TODO(yoo): exception handling
      throw e;
    }
  }
}
