package org.oao.eticket.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.User;
import org.oao.eticket.application.port.out.LoadChallengeWordPort;
import org.oao.eticket.common.annotation.PersistenceAdapter;
import org.oao.eticket.exception.ExternalServiceException;
import org.oao.eticket.exception.NoResultException;
import org.springframework.data.redis.core.RedisTemplate;

@PersistenceAdapter
@RequiredArgsConstructor
class LoadChallengeWordPersistenceAdapter implements LoadChallengeWordPort {

  private final RedisTemplate<String, String> eticketAuthRedisTemplate;

  @Override
  public String load(final User.UserId challenger)
      throws NoResultException, ExternalServiceException {

    final String challengeWord;

    try {
      final var valueOperations = eticketAuthRedisTemplate.opsForValue();
      challengeWord = valueOperations.getAndDelete("c-word:" + challenger);
    } catch (Exception e) {
      throw new ExternalServiceException(e);
    }

    if (challengeWord == null) {
      throw new NoResultException("user has no challenge");
    }

    return challengeWord;
  }
}
