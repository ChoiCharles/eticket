package org.oao.eticket.adapter.out.persistence.repository;

import org.oao.eticket.adapter.out.persistence.entity.SeatJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<SeatJpaEntity, Integer> {}
