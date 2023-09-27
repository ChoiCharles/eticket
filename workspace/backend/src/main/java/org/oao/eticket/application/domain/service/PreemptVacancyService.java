package org.oao.eticket.application.domain.service;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Vacancy;
import org.oao.eticket.application.port.in.PreemptVacancyCommand;
import org.oao.eticket.application.port.in.PreemptVacancyUseCase;
import org.oao.eticket.application.port.out.FindVacancyCommand;
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
            .section(cmd.getSection())
            .seatId(cmd.getSeatId())
            .build();
    final var vacancyRedisEntity = findVacancyPort.findVacancy(findVacancyCommand);
    // Entity -> Model Mapping
    return null;
  }
}
