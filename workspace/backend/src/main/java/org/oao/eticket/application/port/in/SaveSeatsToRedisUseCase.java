package org.oao.eticket.application.port.in;

public interface SaveSeatsToRedisUseCase {
    void saveSeatsToRedis(final SaveSeatsToRedisCommand dto);
}
