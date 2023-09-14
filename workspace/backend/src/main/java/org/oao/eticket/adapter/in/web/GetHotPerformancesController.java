package org.oao.eticket.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Performance;
import org.oao.eticket.application.port.in.GetHotPerformancesUseCase;
import org.oao.eticket.common.annotation.WebAdapter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@WebAdapter
@RequiredArgsConstructor
public class GetHotPerformancesController {
    private final GetHotPerformancesUseCase getHotPerformancesUseCase;

    @GetMapping(
            value = "performances/hot"
    )
    @ResponseStatus(HttpStatus.OK)
    ResponseEntity<?> getHotPerformances() {
        try {
            List<Performance> list = getHotPerformancesUseCase.getHotPerformanceList();
            return ResponseEntity.ok(list) ;
            // ResponseBody에 넣어서 전달
        }
        catch (Exception e) {
            // 조회 중 error가 있으려나??
            throw e;
        }
    }
}
