package org.oao.eticket.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.in.GetVacanciesCommand;
import org.oao.eticket.application.port.in.GetVacanciesUseCase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@WebAdapter
@RequiredArgsConstructor
public class GetVacanciesController { // 특정 공연의 특정 구역의 빈 좌석들 불러오기
  record GetPerformanceScheduleVacanciesResponseBody() {}

  private final GetVacanciesUseCase getVacanciesUseCase;

  // TODO(yoo): api specification
  ResponseEntity<GetPerformanceScheduleVacanciesResponseBody> GetPerformanceScheduleVacncies(
      @PathVariable Integer performanceScheduleId, @RequestParam String section) {
    try {
      final var results =
          getVacanciesUseCase.getVacncies(
              GetVacanciesCommand.builder()
                  .performanceScheduleId(performanceScheduleId)
                  .section(section)
                  .build());
      // TODO(yoo): Model 객체 -> Response
      return ResponseEntity.ok(new GetPerformanceScheduleVacanciesResponseBody());
    } catch (Exception e) {
      // TODO(yoo): exception handling
      throw e;
    }
  }
}
