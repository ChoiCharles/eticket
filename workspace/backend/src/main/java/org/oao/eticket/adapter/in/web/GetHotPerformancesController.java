package org.oao.eticket.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Performance;
import org.oao.eticket.application.port.in.GetHotPerformancesUseCase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.oao.eticket.exception.NoResultException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@WebAdapter
@RequiredArgsConstructor
public class GetHotPerformancesController {
  private final GetHotPerformancesUseCase getHotPerformancesUseCase;

  @GetMapping("performances/hot")
  @ResponseStatus(HttpStatus.OK)
  ResponseEntity<?> getHotPerformances() {
    try {
      List<Performance> list = getHotPerformancesUseCase.getHotPerformanceList();
      return ResponseEntity.ok(list);
      // ResponseBody에 넣어서 전달
    } catch (NoResultException e) {
      // TODO(yoo) :
      throw ApiException.builder()
          .withCause(e)
          .withStatus(HttpStatus.NO_CONTENT)
          .withSummary("오픈 예정인 공연이 없습니다.")
          .build();
    } catch (Exception e) {
      throw ApiException.builder().withCause(e).withSummary(e.getMessage()).build();
    }
  }
}
