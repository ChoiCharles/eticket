package org.oao.eticket.application.domain.service;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Vacancy;
import org.oao.eticket.application.port.in.dto.PreemptVacancyCommand;
import org.oao.eticket.application.port.in.PreemptVacancyUseCase;
import org.oao.eticket.application.port.out.dto.FindVacancyCommand;
import org.oao.eticket.application.port.out.FindVacancyPort;
import org.oao.eticket.common.annotation.UseCase;

@UseCase
@RequiredArgsConstructor
public class PreemptVacancyService implements PreemptVacancyUseCase {
  private final FindVacancyPort findVacancyPort;

  @Override
  public Vacancy preemptVacancy(PreemptVacancyCommand cmd) {
    final var findVacancyCommand =
        FindVacancyCommand.builder()
            .performanceScheduleId(cmd.getPerformanceScheduleId())
            .sectionId(cmd.getSectionId())
            .seatId(cmd.getSeatId())
            .build();
    final var vacancyRedisEntity = findVacancyPort.findVacancy(findVacancyCommand);
    // Entity -> Model Mapping
    return null;
  }
}
