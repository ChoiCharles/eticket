package org.oao.eticket.application.port.out;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LoadVacanciesRedisCommand {
    Integer performanceScheduleId;
    String section;
}
