package org.oao.eticket.application.port.in;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PreemptVacancyCommand {
  Integer performanceScheduleId;
  String section;
  Integer seatId;
}
