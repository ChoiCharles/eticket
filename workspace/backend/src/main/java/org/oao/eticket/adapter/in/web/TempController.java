package org.oao.eticket.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.adapter.out.persistence.repository.PerformanceScheduleRepository;
import org.oao.eticket.application.domain.model.PerformanceScheduleSeatTable;
import org.oao.eticket.application.port.out.LoadPerformanceScheduleSeatTablePort;
import org.oao.eticket.common.annotation.WebAdapter;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@WebAdapter
@RequiredArgsConstructor
public class TempController {
    // 스케줄러로 만든 서비스 API 테스트 해보려고 만든 애
    private final PerformanceScheduleRepository performanceScheduleRepository;
    private final LoadPerformanceScheduleSeatTablePort loadPerformanceScheduleSeatTablePort;
    @GetMapping("api/performances/test")
    List<PerformanceScheduleSeatTable> test() {
        return loadPerformanceScheduleSeatTablePort.loadOpeningInfo();
    }
}
