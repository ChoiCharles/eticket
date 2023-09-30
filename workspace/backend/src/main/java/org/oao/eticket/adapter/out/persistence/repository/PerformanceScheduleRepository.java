package org.oao.eticket.adapter.out.persistence.repository;

import org.oao.eticket.adapter.out.persistence.entity.ConcertHallJpaEntity;
import org.oao.eticket.adapter.out.persistence.entity.PerformanceScheduleJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerformanceScheduleRepository
    extends JpaRepository<PerformanceScheduleJpaEntity, Integer> {

  @Query("SELECT p.performanceScheduleJpaEntityList FROM PerformanceJpaEntity p WHERE FUNCTION('DATE', p.ticketingOpenDateTime) = FUNCTION('DATE', CURRENT_DATE)")
  List<PerformanceScheduleJpaEntity> loadOpeningPerformanceSchedules();

  @Query("SELECT ps.performanceJpaEntity.concertHallJpaEntity FROM PerformanceScheduleJpaEntity ps WHERE ps.id = :id")
  ConcertHallJpaEntity findConcertHallById(@Param("id") Integer id);
}
