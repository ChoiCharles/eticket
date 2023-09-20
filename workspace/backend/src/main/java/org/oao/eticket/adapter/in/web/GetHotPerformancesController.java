package org.oao.eticket.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Performance;
import org.oao.eticket.application.port.in.GetHotPerformancesUseCase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.oao.eticket.exception.NoResultException;
import org.oao.eticket.exception.PerformanceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@WebAdapter
@RequiredArgsConstructor
public class GetHotPerformancesController {
  record GetHotPerformancesResponseBody() {}

  private final GetHotPerformancesUseCase getHotPerformancesUseCase;

  @GetMapping("performances/hot")
  @ResponseStatus(HttpStatus.OK)
  ResponseEntity<?> getHotPerformances() {
    try {
      List<Performance> list = getHotPerformancesUseCase.getHotPerformanceList();
      return ResponseEntity.ok(list);
      // ResponseBody에 넣어서 전달
    } catch (PerformanceNotFoundException e) {
      // TODO(yoo) :
      throw ApiException.builder()
          .withCause(e)
          .withStatus(HttpStatus.NO_CONTENT)
          .withSummary(e.getMessage())
          .build();
    } catch (IllegalArgumentException e) {
      throw ApiException.builder()
              .withCause(e)
              .withStatus(HttpStatus.BAD_REQUEST)
              .withSummary(e.getMessage())
              .withDescription("Query ERROR")
              .build();
    } catch (Exception e) {
      throw ApiException.builder()
          .withStatus(HttpStatus.INTERNAL_SERVER_ERROR)
          .withCause(e)
          .withSummary(e.getMessage())
          .build();
    }
  }
}
