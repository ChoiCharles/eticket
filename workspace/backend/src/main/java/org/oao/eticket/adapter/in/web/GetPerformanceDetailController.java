package org.oao.eticket.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Performance;
import org.oao.eticket.application.port.in.GetPerformanceDetailUseCase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.oao.eticket.exception.PerformanceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;

@WebAdapter
@RequiredArgsConstructor
public class GetPerformanceDetailController {
  record GetPerformanceDetailResponseBody(Performance performance) {}

  private final GetPerformanceDetailUseCase getPerformanceDetailUseCase;

  @Operation(
      summary = "공연 상세 정보 불러 오기",
      responses = {
        @ApiResponse(
            responseCode = "200",
            description = "특정 공연 상세 정보 불러 오기 성공",
            content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
      })
  @GetMapping(value = "/performances/{performanceId}", produces = "application/json; charset=utf-8")
  @ResponseStatus(HttpStatus.OK)
  ResponseEntity<GetPerformanceDetailResponseBody> getPerformanceDetail(
      @Valid @PathVariable("performanceId") Integer payload) {
    // TODO (yoo) : body type
    try {
      final var performance = getPerformanceDetailUseCase.getPerformance(payload);
      return ResponseEntity.ok(new GetPerformanceDetailResponseBody(performance));
    } catch (PerformanceNotFoundException e) {
      // TODO(yoo) :
      throw ApiException.builder()
          .withStatus(HttpStatus.NO_CONTENT)
          .withCause(e)
          .withMessage(String.format("%s 공연이 존재 하지 않습니다.", e.getMessage()))
          .build();
    } catch (Exception e) {
      throw ApiException.builder().withCause(e).withMessage(e.getMessage()).build();
    }
  }
}
