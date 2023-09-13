package org.oao.eticket.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<SeatJpaEntity, Integer> {}
