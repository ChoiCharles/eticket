package org.oao.eticket.application.port.out;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class FindVacancyCommand {
  Integer performanceScheduleId;
  Integer sectionId;
  Integer seatId;
}
