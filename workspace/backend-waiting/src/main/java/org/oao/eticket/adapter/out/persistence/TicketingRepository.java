package org.oao.eticket.adapter.out.persistence;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.util.Set;

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

  /**
   * @desc: Sorted Set 초기화
   */
  public ZSetOperations<String, Integer> opsForZSet() {
    return ticketingStorage.opsForZSet();
  }

  /**
   * @desc: Sorted Set 요소 삽입
   */
  public void zAdd(String key, Integer userId) {
    opsForZSet().add(key, userId, System.currentTimeMillis());
  }

  /**
   * @desc: Sorted Set 요소 삭제
   */
  public void zRem(String key, Integer userId) {
    opsForZSet().remove(key, userId);
  }

  /**
   * @desc: Sorted Set key 조회
   */
  public Set<String> getKeys(String pattern) {
    return ticketingStorage.keys(pattern);
  }

  /**
   * @desc: Sorted Set 삭제
   */
  public void delete(String key) {
    ticketingStorage.delete(key);
  }

  /**
   * @desc: Sorted Set 자료형 사이즈
   */
  public Long zCard(String key) {
    return opsForZSet().size(key);
  }

  /**
   * @desc: Sorted Set 자료형 start ~ end 까지 조회.
   */
  public Set<Integer> zRange(String key, Long start, Long end) {
    return opsForZSet().range(key, start, end);
  }

  /**
   * @desc: Sorted Set 자료형 Value의 현재위치 조회.
   */
  public Long zRank(String key, Integer userId) {
    return opsForZSet().rank(key, userId);
  }
}
