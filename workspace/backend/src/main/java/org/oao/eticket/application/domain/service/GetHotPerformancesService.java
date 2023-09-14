package org.oao.eticket.application.domain.service;

import lombok.RequiredArgsConstructor;
import org.oao.eticket.application.domain.model.Performance;
import org.oao.eticket.application.port.in.GetHotPerformancesUseCase;
import org.oao.eticket.application.port.out.LoadHotPerformancesPort;
import org.oao.eticket.common.annotation.UseCase;

import java.util.List;

@UseCase
@RequiredArgsConstructor
public class GetHotPerformancesService implements GetHotPerformancesUseCase {
    private final LoadHotPerformancesPort loadHotPerformancesPort;

    @Override
    public List<Performance> getHotPerformanceList() {
        return loadHotPerformancesPort.loadHotPerformances();
    }
    // DB에 조회 메서드
}
