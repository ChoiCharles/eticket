package org.oao.eticket.application.port.in;

import org.oao.eticket.application.port.in.dto.SaveSeatsToRedisCommand;

public interface SaveSeatsToRedisUseCase {
    void saveSeatsToRedis(final SaveSeatsToRedisCommand dto);
}
