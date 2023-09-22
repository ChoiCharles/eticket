package org.oao.eticket.application.domain.service;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.in.SaveSeatsToRedisCommand;
import org.oao.eticket.application.port.in.SaveSeatsToRedisUseCase;
import org.oao.eticket.common.annotation.UseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;

@UseCase
@RequiredArgsConstructor
public class SaveSeatsToRedisService implements SaveSeatsToRedisUseCase {

    @Autowired
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void saveSeatsToRedis(SaveSeatsToRedisCommand seatMap) {
        // 1. 저장할 공연 객체 DB에서 가져오기 (특정 시간에 그날 예매 열리는 거 다 가져오는 거면 List로)

        // 2. 레디스에 저장.
        HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();

    }
}
