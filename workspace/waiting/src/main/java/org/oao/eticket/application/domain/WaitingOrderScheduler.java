package org.oao.eticket.application.domain;

import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.in.PopQueueUseCase;
import org.oao.eticket.application.port.out.GetKeysPort;
import org.springframework.scheduling.annotation.Scheduled;

@RequiredArgsConstructor
public class WaitingOrderScheduler {
  
  private final PopQueueUseCase popQueueUseCase;
  private final GetKeysPort getKeysPort;

  @Scheduled(fixedDelay = 1000)
  private void schedule() {
    Set<String> keys = getKeysPort.getKeys();
    for (String key : keys) {
      popQueueUseCase.popQueue(key);
      
    }

  }
}
