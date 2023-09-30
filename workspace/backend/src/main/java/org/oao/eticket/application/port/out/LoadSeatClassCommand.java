package org.oao.eticket.application.port.out;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LoadSeatClassCommand {
    Integer performanceScheduleId;
    Integer sectionId;
}
