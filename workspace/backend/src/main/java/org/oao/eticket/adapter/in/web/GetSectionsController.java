package org.oao.eticket.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.oao.eticket.common.annotation.WebAdapter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;

@WebAdapter
@RequiredArgsConstructor
public class GetSectionsController { // 예매 대기열이 끝난 후, 특정 공연에 대한 공연장 정보

  record GetSectionsResponseBody() {}

  // private final GetSectionsUseCase getSectionsUseCase;

  @Operation(
      summary = "특정 공연 회차에 대한 공연장 구역 표 제공",
      description =
          "예매 대기열에서 빠져 나온 사용자가 처음 예매 화면에 진입 했을 때 제공할 API 입니다. \n 특정 공연 회차에 진행 되는 공연장의 구역 정보가 리스트로 제공됩니다. ",
      responses = {
        @ApiResponse(
            responseCode = "200",
            description = "OK 선택한 공연 회차의 공연장 구역 정보 리스트",
            content = @Content(schema = @Schema(implementation = GetSectionsResponseBody.class))),
        @ApiResponse(
            responseCode = "401",
            description = "NO AUTHORIZED. (권한이 없습니다. 대기열에서 빠져나온 유저의 요청이 아닙니다.)",
            content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))),
        @ApiResponse(
            responseCode = "400",
            description = "BAD REQUEST. (요청한 API에 해당하는 공연 스케줄 ID가 존재하지 않습니다.)",
            content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
      })
  @GetMapping("schedules/{performanceScheduleId}/sections")
  @ResponseStatus(HttpStatus.OK)
  ResponseEntity<GetSectionsResponseBody> getSections(
      @PathVariable("performanceScheduleId") Integer performancesScheduledId) {
    try {
      // use case릁 통해 MySql에서 특정 공연의 상세 정보 가져오기

      return ResponseEntity.ok(new GetSectionsResponseBody());
    } catch (Exception e) {
      // TODO(yoo): exception handling
      // AUTHORIZED (대기열에 등록돼있던 사용자 아님)
      // API BAD REQUEST (performance Schedule과 section의 id가 잘못됨)
      // NO CONTENT (잔여 좌석 없음) or NOT FOUND
      throw e;
    }
  }
}
