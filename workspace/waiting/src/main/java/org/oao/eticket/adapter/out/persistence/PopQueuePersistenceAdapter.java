package org.oao.eticket.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.out.PopQueuePort;
import org.oao.eticket.common.annotation.PersistenceAdapter;

@PersistenceAdapter
@RequiredArgsConstructor
public class PopQueuePersistenceAdapter implements PopQueuePort {

  private final RedisRepository redisRepository;
  private static final long POP_SIZE = 10;

  @Override
  public void popQueue(String key) {
    long size = Math.min(POP_SIZE, redisRepository.zCard(key));
    redisRepository.zPop(key, size);
  }
}
