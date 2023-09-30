package org.oao.eticket.application.domain.service;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.out.LoadPerformanceScheduleSeatTablePort;
import org.oao.eticket.common.annotation.UseCase;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;

@UseCase
@RequiredArgsConstructor
public class SaveVacanciesToRedisSchedulerService {
    private final LoadPerformanceScheduleSeatTablePort port;

    private final RedisTemplate<String, Object> eticketReservationRedisTemplate;

    @Scheduled(cron = "0 0 0 * * ?") // 매일 00시 00분 00초에 실행
    public void saveSeatsToRedis() {
        // 1. 저장할 공연 객체 DB에서 가져오기 (특정 시간에 그날 예매 열리는 거 다 가져오는 거면 List로)
        final var seatTables = port.loadSeatTable();
        // 2. 레디스에 저장. (List<PerformanceScheduleSeatTable>)
//        HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();
    }
}
