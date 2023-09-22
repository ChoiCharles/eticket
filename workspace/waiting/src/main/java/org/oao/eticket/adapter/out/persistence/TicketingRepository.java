package org.oao.eticket.adapter.out.persistence;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;

@Slf4j
@Repository
public class TicketingRepository {

  private final RedisTemplate<String, Integer> ticketingStorage;

  @Autowired
  public TicketingRepository(
      @Qualifier("ticketingStorage") RedisTemplate<String, Integer> ticketingStorage) {
    this.ticketingStorage = ticketingStorage;
  }

  private final static Duration TICKETING_TTL = Duration.ofMinutes(5);

  public void setStatus(Integer performanceId, Integer userId) {
    String key = getKey(performanceId);
    log.info("Set Child to Redis {}({})", key, userId);
    ticketingStorage.opsForSet().add(key, userId);
  }

  public boolean isON(Integer performanceId) {
    String status = (String) ticketingStorage.opsForValue().get(getKey(performanceId));
    if (ObjectUtils.isEmpty(status)) {
      return false;
    }
    log.info("Get Child from Redis {}", status);
    return true;
  }

  public void delete(Integer performanceId) {
    String key = getKey(performanceId);
    ticketingStorage.delete(key);
  }

  private String getKey(Integer performanceId) {
    return "Ticketing::" + performanceId;
  }
}
