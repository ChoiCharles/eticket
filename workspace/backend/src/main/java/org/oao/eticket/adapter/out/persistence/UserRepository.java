package org.oao.eticket.adapter.out.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.oao.eticket.application.domain.model.User;
import org.oao.eticket.application.port.out.CreateUserCommand;
import org.oao.eticket.application.port.out.LoadUserPort;
import org.oao.eticket.application.port.out.CreateUserPort;
import org.oao.eticket.common.annotation.PersistenceAdapter;
import org.oao.eticket.exception.UserDuplicateException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@PersistenceAdapter
@RequiredArgsConstructor
class UserRepository implements CreateUserPort, LoadUserPort {

    private final UserMapper userMapper;

    @PersistenceContext
    private final EntityManager entityManager;

    @Transactional
    public User create(final CreateUserCommand cmd) {
        try {
            final var user = userMapper.mapToJpaEntity(cmd);
            entityManager.persist(user);
            return userMapper.mapToDomainEntity(user);
        } catch (ConstraintViolationException e) {
            if (e.getMessage().contains("Duplicate entry")) {
                throw new UserDuplicateException(e);
            }
            throw e;
        }
    }

    @Override
    public User loadById(final User.UserId id) {
        try {
            final var user = entityManager
                    .createQuery("""
                            SELECT u
                            FROM UserJpaEntity u
                            WHERE u.id=:id""", UserJpaEntity.class)
                    .setParameter("id", id.getValue())
                    .getSingleResult();
            return userMapper.mapToDomainEntity(user);
        } catch (Exception e) {
            // TODO(meo-s): must be wrap exception and throw it
            throw e;
        }
    }

}
