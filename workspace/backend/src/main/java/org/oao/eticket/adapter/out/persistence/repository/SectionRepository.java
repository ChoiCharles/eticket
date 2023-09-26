package org.oao.eticket.adapter.out.persistence.repository;

import org.oao.eticket.adapter.out.persistence.entity.ConcertHallJpaEntity;
import org.oao.eticket.adapter.out.persistence.entity.SectionJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SectionRepository extends JpaRepository<SectionJpaEntity, Integer> {
    List<SectionJpaEntity> findAllByConcertHallJpaEntity(ConcertHallJpaEntity concertHall);
}
