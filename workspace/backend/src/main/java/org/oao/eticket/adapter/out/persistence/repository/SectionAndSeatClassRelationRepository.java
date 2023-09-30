package org.oao.eticket.adapter.out.persistence.repository;

import org.oao.eticket.adapter.out.persistence.entity.PerformanceJpaEntity;
import org.oao.eticket.adapter.out.persistence.entity.SeatClassJpaEntity;
import org.oao.eticket.adapter.out.persistence.entity.SectionAndSeatClassRelationJpaEntity;
import org.oao.eticket.adapter.out.persistence.entity.SectionJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SectionAndSeatClassRelationRepository
    extends JpaRepository<SectionAndSeatClassRelationJpaEntity, Integer> {

  @Query("SELECT s.seatClassJpaEntity " +
          "FROM SectionAndSeatClassRelationJpaEntity s " +
          "WHERE s.seatClassJpaEntity.performanceJpaEntity.id = :performanceId " +
          "AND s.sectionJpaEntity.id = :sectionId")
  SeatClassJpaEntity findSeatClassBySectionAndPerformance(
          @Param("sectionId") Integer sectionId,
          @Param("performanceId") Integer performanceId);

}
