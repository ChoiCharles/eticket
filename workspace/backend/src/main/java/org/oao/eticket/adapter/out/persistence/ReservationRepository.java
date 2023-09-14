package org.oao.eticket.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<ReservationJpaEntity, Integer> {
    @Query(value = "select R from ReservationJpaEntity R where R.userJpaEntity.id = :userId")
    List<ReservationJpaEntity> findAllByUserId(Integer userId);
}
