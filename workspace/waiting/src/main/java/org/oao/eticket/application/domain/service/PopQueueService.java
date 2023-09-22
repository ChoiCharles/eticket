package org.oao.eticket.application.domain.service;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.in.PopQueueUseCase;
import org.oao.eticket.application.port.out.PopQueuePort;
import org.oao.eticket.common.annotation.UseCase;

@UseCase
@RequiredArgsConstructor
public class PopQueueService implements PopQueueUseCase {

  private final PopQueuePort popQueuePort;

  public void publish(Event event) {
    final long start = FIRST_ELEMENT;
    final long end = PUBLISH_SIZE - LAST_INDEX;

    Set<Object> queue = redisTemplate.opsForZSet().range(event.toString(), start, end);
    for (Object people : queue) {
      final Gifticon gifticon = new Gifticon(event);
      log.info(
          "'{}'님의 {} 기프티콘이 발급되었습니다 ({})",
          people,
          gifticon.getEvent().getName(),
          gifticon.getCode());
      redisTemplate.opsForZSet().remove(event.toString(), people);
      this.eventCount.decrease();
    }
  }


  @Override
  public void popQueue(String key) {
    popQueuePort.popQueue(key);
  }
}
