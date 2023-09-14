package org.oao.eticket.adapter.out.persistence;

import org.oao.eticket.application.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<ReservationJpaEntity, Integer> {
    List<ReservationJpaEntity> findAllByUserJpaEntity(UserJpaEntity userJpaEntity);
}
