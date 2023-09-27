package org.oao.eticket.application.port.in;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class GetVacanciesCommand {
    Integer performanceScheduleId;
    String section;
}
