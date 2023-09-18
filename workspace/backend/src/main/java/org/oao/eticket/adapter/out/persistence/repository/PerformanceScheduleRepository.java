package org.oao.eticket.adapter.out.persistence.repository;

import org.oao.eticket.adapter.out.persistence.entity.PerformanceScheduleJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformanceScheduleRepository
    extends JpaRepository<PerformanceScheduleJpaEntity, Integer> {}
