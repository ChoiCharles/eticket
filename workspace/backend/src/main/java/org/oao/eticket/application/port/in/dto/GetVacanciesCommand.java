package org.oao.eticket.application.port.in.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class GetVacanciesCommand {
  Integer performanceScheduleId;
  Integer sectionId;
}
