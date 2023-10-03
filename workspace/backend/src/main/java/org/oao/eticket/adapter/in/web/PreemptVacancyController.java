package org.oao.eticket.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Vacancy;
import org.oao.eticket.application.port.in.dto.PreemptVacancyCommand;
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
  record PreemptVacancyResponseBody(Vacancy vacancy) {}

  private PreemptVacancyUseCase preemptVacancyUseCase;

  @Operation(
      summary = "특정 좌석을 클릭 하여 좌석에 대한 좌석 선점 요청",
      description = "사용자가 빈 좌석 중 하나를 선택 하여 해당 좌석에 대한 좌석 선점을 요청 하는 API 입니다.",
      responses = {
        @ApiResponse(
            responseCode = "200",
            description = "OK. 선택한 좌석에 대해 선점권이 생김",
            content =
                @Content(schema = @Schema(implementation = PreemptVacancyResponseBody.class))),
        @ApiResponse(
            responseCode = "401",
            description = "NO AUTHORIZED. (권한이 없습니다. 대기열에서 빠져나온 유저의 요청이 아닙니다.)",
            content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))),
        @ApiResponse(
            responseCode = "400",
            description = "BAD REQUEST. (공연 스케줄, 섹션, 좌석 중 잘못된 ID가 입력 됨.)",
            content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))),
        @ApiResponse(
            responseCode = "409",
            description = "CONFLICT. (사용자가 선택한 좌석이 이미 다른 사용자에 의해 선점된 좌석 입니다.)",
            content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
      })
  @PostMapping("/api/schedules/{performanceScheduleId}/sections/{section}/seats/{seatId}")
  @ResponseStatus(HttpStatus.OK)
  ResponseEntity<PreemptVacancyResponseBody> preemptVacancy(
      @PathVariable Integer performanceScheduleId,
      @PathVariable Integer sectionId,
      @PathVariable Integer seatId) {
    try {
      final var preemptVacancyCommand =
          PreemptVacancyCommand.builder()
              .performanceScheduleId(performanceScheduleId)
              .sectionId(sectionId)
              .seatId(seatId)
              .build();
      final var vacancy = preemptVacancyUseCase.preemptVacancy(preemptVacancyCommand);
      return ResponseEntity.ok(new PreemptVacancyResponseBody(vacancy));
    } catch (Exception e) {
      // 409
      throw e;
    }
  }
}
