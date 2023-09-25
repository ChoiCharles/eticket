package org.oao.eticket.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.out.AddQueuePort;
import org.oao.eticket.common.annotation.PersistenceAdapter;

@PersistenceAdapter
@RequiredArgsConstructor
public class AddQueuePersistenceAdapter implements AddQueuePort {

  private final WaitingRepository waitingRepository;

  @Override
  public void addQueue(String key, Integer userId) {
    waitingRepository.zAdd(key, userId);
  }
}
