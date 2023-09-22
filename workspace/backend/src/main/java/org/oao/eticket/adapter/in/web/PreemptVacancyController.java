package org.oao.eticket.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.in.PreemptVacancyCommand;
import org.oao.eticket.application.port.in.PreemptVacancyUseCase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@WebAdapter
@RequiredArgsConstructor
public class PreemptVacancyController {
  record PreemptVacancyResponseBody() {}

  private PreemptVacancyUseCase preemptVacancyUseCase;

  @PostMapping("schedules/{performanceScheduleId}/sections/{section}/seats/{seatId}")
  @ResponseStatus(HttpStatus.OK)
  ResponseEntity<PreemptVacancyResponseBody> preemptVacancy(
      @PathVariable Integer performanceScheduleId,
      @PathVariable String section,
      @PathVariable Integer seatId) {
    try {
      final var preemptVacancyCommand =
          PreemptVacancyCommand.builder()
              .performanceScheduleId(performanceScheduleId)
              .section(section)
              .seatId(seatId)
              .build();
      final var vacancy = preemptVacancyUseCase.preemptVacancy(preemptVacancyCommand);
      return ResponseEntity.ok(new PreemptVacancyResponseBody());
    } catch (Exception e) {
      // 409
      throw e;
    }
  }
}
