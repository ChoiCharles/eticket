package org.oao.eticket.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.out.GetKeysPort;
import org.oao.eticket.common.annotation.PersistenceAdapter;

import java.util.Set;

@PersistenceAdapter
@RequiredArgsConstructor
public class GetKeysPersistenceAdapter implements GetKeysPort {

  private final RedisRepository redisRepository;

  @Override
  public Set<String> getKeys() {
    String pattern = "Waiting::*";
    return redisRepository.getKeys(pattern);
  }
}
