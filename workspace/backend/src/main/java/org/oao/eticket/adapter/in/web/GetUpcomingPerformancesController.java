package org.oao.eticket.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.port.in.GetUpcomingPerformancesUsecase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.oao.eticket.exception.NoResultException;
import org.oao.eticket.exception.PerformanceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@WebAdapter
@RequiredArgsConstructor
public class GetUpcomingPerformancesController {
  private final GetUpcomingPerformancesUsecase getUpdomingPerformanceUserCase;

  record UpcomingsResponseBody(Object resultList) {}

  @GetMapping("/performances/upcoming")
  @ResponseStatus(HttpStatus.OK)
  ResponseEntity<UpcomingsResponseBody> getUpcomingPerformances() {
    try {
      final var resultList = getUpdomingPerformanceUserCase.getUpcomingPerformances();

      return ResponseEntity.ok(new UpcomingsResponseBody(resultList));
    } catch (PerformanceNotFoundException e) {
      // TODO(yoo) :
      throw ApiException.builder()
              .withCause(e)
              .withStatus(HttpStatus.NO_CONTENT)
              .withSummary(e.getMessage())
              .build();
    } catch (Exception e) {
      throw ApiException.builder().withCause(e).withSummary(e.getMessage()).build();
    }
  }
}
